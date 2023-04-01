function getPrediction(event) {
  event.preventDefault();

  // Get the form data
  const formData = new FormData(event.target);

  // Construct the JSON object for the API call
  const instances = [];
  const formEntries = formData.entries();
  for (const [key, value] of formEntries) {
    instances.push({ [key]: value });
  }
  const data = { instances };

  // Make the API call
  const endpointId = "6567598456985092096";
  const projectId = "my-project-1-ece-528";
  const accessToken = "<your access token here>";
  const apiUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/endpoints/${endpointId}:predict`;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(json => {
      // Update the prediction-results <div> with the prediction results
      const resultsDiv = document.getElementById("prediction-results");
      resultsDiv.innerHTML = JSON.stringify(json, null, 2);
    })
    .catch(error => console.error(error));
}
