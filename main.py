from flask import Flask, redirect, request, session
from google.oauth2 import id_token
from google.auth.transport import requests
from google.cloud import aiplatform
import random

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def home():
    if 'email' in session:
        return f'Welcome, {session["email"]}!'
    else:
        return redirect('/login')

@app.route('/login')
def login():
    # Create a state token to prevent request forgery.
    state = str(random.randint(0, 999999))
    session['state'] = state
    # Set the client ID, token URI, and redirect URI.
    client_id = 'YOUR_CLIENT_ID'
    redirect_uri = 'https://your-app.appspot.com/oauth2callback'
    token_uri = 'https://oauth2.googleapis.com/token'
    # Construct the authorization URL.
    authorization_url = ('https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id='
                         + client_id + '&redirect_uri=' + redirect_uri + '&scope=email&state=' + state)
    return redirect(authorization_url)

@app.route('/oauth2callback')
def oauth2callback():
    # Check the state token to prevent request forgery.
    if request.args.get('state') != session['state']:
        return 'Error: invalid state token'
    # Exchange the authorization code for an access token.
    client_id = 'YOUR_CLIENT_ID'
    client_secret = 'YOUR_CLIENT_SECRET'
    authorization_code = request.args.get('code')
    redirect_uri = 'https://your-app.appspot.com/oauth2callback'
    token_uri = 'https://oauth2.googleapis.com/token'
    token_request_data = {
        'code': authorization_code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }
    response = requests.post(token_uri, data=token_request_data)
    # Get the ID token from the response.
    token_data = response.json()
    id_token_str = token_data['id_token']
    # Verify the ID token and get the user's email address.
    idinfo = id_token.verify_oauth2_token(id_token_str, requests.Request(), client_id)
    email = idinfo['email']
    # Do something with the user's email address, such as store it in a session or database.
    session['email'] = email
    return redirect('/')

instance = [
    {"usmers": "1", "medical_type": "1", "gender": "1", "patient_type": "1", "intubated": "1", "pneumonia": "2", "age": "50",
     "pregnant": "1", "diabetes": "1", "copd": "1", "asthma": "2", "inmsupr": "2", "hypertension": "2", "other_disease": "2",
     "cardiovascular": "1", "obesity": "2", "renal_chronic": "2", "tobacho": "1", "classification": "3", "icu": "2"}
]

@app.route('/predict')
def predict(instances=instance):
    # Define the endpoint and location
    project_id = "your-project-id"
    endpoint_id = "your-endpoint-id"
    location = "us-central1"

    # Create the AI Platform client
    client_options = {"api_endpoint": f"{location}-aiplatform.googleapis.com"}
    client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)

    # Format the input data as a JSON object
    input_data = {"instances": instances}

    # Make the prediction request
    endpoint = client.endpoint_path(project_id, location, endpoint_id)
    response = client.predict(endpoint=endpoint, instances=input_data)

    # Extract the prediction result from the response
    result = response.predictions[0]

    return f'The predicted classification is: {result}'

