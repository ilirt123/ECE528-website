const ENDPOINT_ID = "6567598456985092096";
const PROJECT_ID = "my-project-1-ece-528";
const API_ENDPOINT = "https://us-central1-aiplatform.googleapis.com/v1/projects/" + PROJECT_ID + "/locations/us-central1/endpoints/" + ENDPOINT_ID + ":predict";

// Create a JSON object to hold your tabular data.
const data = {
  "instances": [
    { "usmers": "1", "medical_type": "1", "gender": "1", "patient_type": "1", 
    "intubated": "1", "pneumonia": "2", "age": "50", "pregnant": "1", "diabetes": "1", "copd": "1",
     "asthma": "2", "inmsupr": "2", "hypertension": "2", "other_disease": "2", "cardiovascular": "1", 
     "obesity": "2", "renal_chronic": "2", "tobacho": "1", "clasiffication": "3", "icu": "2"}
  ]
}

// Make the API request
fetch(API_ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + gapi.auth.getToken().access_token
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
