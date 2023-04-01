const form = document.getElementById('data-form');
const instancesDiv = document.getElementById('instances');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the number of instances from the form
  const numInstances = parseInt(document.getElementById('num-instances').value, 10);

  // Create an array to hold the instances
  const instances = [];

  // Loop through each instance and get the input values
  for (let i = 0; i < numInstances; i++) {
    const instance = {
      users: parseInt(prompt(`Enter number of users for instance ${i + 1}:`), 10),
      gender: prompt(`Enter gender for instance ${i + 1}:`),
      patient_type: prompt(`Enter patient type for instance ${i + 1}:`),
      intubated: parseInt(prompt(`Enter intubation status (0 or 1) for instance ${i + 1}:`), 10),
      pneumonia: parseInt(prompt(`Enter pneumonia status (0 or 1) for instance ${i + 1}:`), 10),
      age: parseInt(prompt(`Enter age for instance ${i + 1}:`), 10),
      classification: prompt(`Enter classification for instance ${i + 1}:`),
    };
    instances.push(instance);
  }

  // Send an HTTP request to the RESTful API
  const response = await fetch('https://us-central1-aiplatform.googleapis.com/v1/projects/my-project-1-ece-528/locations/us-central1/endpoints/6567598456985092096:predict', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${await gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ instances }),
  });

  // Parse the response and display the results on the page
  const result = await response.json();
  const resultsDiv = document.createElement('div');
  resultsDiv.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  instancesDiv.appendChild(resultsDiv);
});
