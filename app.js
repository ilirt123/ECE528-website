function submitData() {
  const usmers = document.getElementById("usmers-input").value;
  const gender = document.getElementById("gender-input").value;
  const patientType = document.getElementById("patient-type-input").value;
  const intubated = document.getElementById("intubated-input").value;
  const pneumonia = document.getElementById("pneumonia-input").value;
  const age = document.getElementById("age-input").value;

  const data = {
    "instances": [
      {
        "usmers": usmers,
        "gender": gender,
        "patient_type": patientType,
        "intubated": intubated,
        "pneumonia": pneumonia,
        "age": age,
        "classification": 0
      }
    ]
  };

  fetchAccessToken()
    .then((accessToken) => fetchPrediction(accessToken, data))
    .catch((error) => console.log(error));
}

function fetchAccessToken() {
  const authEndpoint = "https://oauth2.googleapis.com/token";
  const authParams = {
    grant_type: "refresh_token",
    client_id: "764086051850-6qr4p6gpi6hn506pt8ejuq83di341hur.apps.googleusercontent.com",
    client_secret: "d-FL95Q19q7MQmFpd7hHD0Ty",
    refresh_token: "1//05BUvbksk_6JmCgYIARAAGAUSNwF-L9IrC-0SoXRqchO9KzfeYtYPpiOn77jvHnhp75YbLRCkH6xybzbaLP4Brqtg0XjcZNxB-_c"
  };

  return fetch(authEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(authParams)
  })
    .then(response => response.json())
    .then(data => data.access_token);
}

function fetchPrediction(accessToken, data) {
  const endpointId = "6567598456985092096";
  const projectId = "my-project-1-ece-528";
  const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/endpoints/${endpointId}:predict`;

  fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      const prediction = result.predictions[0];
      const output = prediction[0];
      // do something with the prediction output
    })
    .catch(error => console.log(error));
}

