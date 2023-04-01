const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/predict', (req, res) => {
  // Get the input data from the client-side
  const inputData = req.body.instances;

  // Set up the environment variables
  const endpointId = process.env.ENDPOINT_ID;
  const projectId = process.env.PROJECT_ID;
  const inputFilename = 'input.json';

  // Write the input data to a JSON file
  const fs = require('fs');
  fs.writeFileSync(inputFilename, JSON.stringify({ instances: inputData }));

  // Execute the prediction request using the gcloud command
  exec(
    `curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/endpoints/${endpointId}:predict \
    -d "@${inputFilename}"`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }

      // Parse the prediction result from the output of the gcloud command
      const result = JSON.parse(stdout);

      // Send the prediction result back to the client-side
      res.send(result);
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
