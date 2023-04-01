const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/predict", (req, res) => {
  const endpointId = "6567598456985092096";
  const projectId = "my-project-1-ece-528";
  const inputData = req.body;

  const command = `curl \
    -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/endpoints/${endpointId}:predict \
    -d '${JSON.stringify(inputData)}'`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send("Error");
      return;
    }

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      res.status(500).send("Error");
      return;
    }

    const result = JSON.parse(stdout);
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
