function predict() {
  const endpointId = "6567598456985092096";
  const projectId = "my-project-1-ece-528";
  const inputDataFile = "path/to/data.json";

  fetch('/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ endpointId, projectId, inputDataFile })
  })
  .then(response => response.json())
  .then(data => {
    const predictionElement = document.getElementById('prediction');
    predictionElement.innerText = data.predicted_result;
  })
  .catch(error => console.error(error));
}
