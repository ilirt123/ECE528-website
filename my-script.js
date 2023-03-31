const ENDPOINT_ID = "6567598456985092096";
const PROJECT_ID = "my-project-1-ece-528";
const INPUT_DATA_FILE = "path/to/data.json";

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
  .then(data => console.log(data))
  .catch(error => console.error(error));
}
