const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/predict', (req, res) => {
  const { endpointId, projectId, inputDataFile } = req.body;

  exec(`gcloud auth print-access-token`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to obtain access token');
      return;
    }

    const accessToken = stdout.trim();

    exec(`curl -X POST -H "Authorization: Bearer ${accessToken}" -H "Content-Type: application/json" https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/endpoints/${endpointId}:predict -d "@${inputDataFile}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to execute API request');
        return;
      }

      const prediction = JSON.parse(stdout);
      res.json(prediction);
    });
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
