const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

// Set up the Express.js app
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up the POST endpoint for predictions
app.post('/predict', (req, res) => {
  // Extract the feature data from the request body
  const features = req.body.features;

  // Set up the request options
  const options = {
    method: 'POST',
    url: `https://us-central1-aiplatform.googleapis.com/v1/projects/${process.env.PROJECT_ID}/locations/us-central1/endpoints/${process.env.ENDPOINT_ID}:predict`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    },
    body: JSON.stringify({ instances: features })
  };

  // Send the request to the Vertex AI endpoint
  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      // Return the prediction result to the client
      const result = JSON.parse(body).predictions[0].output;
      res.status(200).send(result);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
