function predict() {
  fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}:predict`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${gcloud auth print-access-token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(INPUT_DATA_FILE)
  })
  .then(response => response.json())
  .then(data => {
    const predictionElement = document.getElementById('prediction');
    predictionElement.innerText = data.predicted_result;
  })
  .catch(error => console.error(error));
}
