function UserAction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
         }
    };
    xhttp.open("POST", "https://us-central1-aiplatform.googleapis.com/v1/projects/$6567598456985092096/locations/us-central1/endpoints/$my-project-1-ece-528:predict, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("instances": [
    {
      "usmers": 2,
      "gender": 3,
      "patient_type": 0,
      "intubated": 1,
      "pneumonia": 2,
      "age": 50,
      "classification": 3,
      "medical_type": 0,
      "diabetes": 0,
      "copd": 1,
      "hypertension": 2,
      "other_disease": 1,
      "cardiovascular": 0,
      "obesity": 2,
      "renal_chronic": 2,
      "tobacco": 0,
      "icu": 3
    }   
    
  ]");
}
