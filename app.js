const endpointId = "6567598456985092096";
const projectId = "my-project-1-ece-528";
const endpointUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/endpoints/${endpointId}:predict`;

const form = document.querySelector("#form");
const resultDiv = document.querySelector("#result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const inputs = Object.fromEntries(formData.entries());
  
  const payload = {
    "instances": [
      {
        "usmers": 2,
        "gender": inputs.gender,
        "patient_type": inputs.patient_type,
        "intubated": inputs.intubated,
        "pneumonia": inputs.pneumonia,
        "age": parseInt(inputs.age),
        "classification": inputs.classification
      }
    ]
  };
  
  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${await getAccessToken()}`
      },
      body: JSON.stringify(payload)
    });
    const prediction = await response.json();
    const result = prediction.predictions[0].classification;
    resultDiv.textContent = `The classification is ${result}.`;
  } catch (error) {
    console.error(error);
    resultDiv.textContent = "An error occurred during the prediction.";
  }
});

async function getAccessToken() {
  const response = await fetch("https://us-central1-aiplatform.googleapis.com/v1/projects/-/serviceAccounts/default/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "scope": "https://www.googleapis.com/auth/cloud-platform"
    })
  });
  const { access_token } = await response.json();
  return access_token;
}
