#### command to download requirements
#### python -m pipreqs.pipreqs --force

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from PredictionModel.diagnosis import get_resp
from fbinterface import getdcmfiles, checkdir, initapp

endpoint_call = "/get-diagnosis"
bucket = initapp()
app = Flask(__name__)
CORS(app)

# function to return mock response for testing
def mockresponse():
    file_path = "respnew.txt"
    try:
        with open(file_path, "r") as file:
            file_contents = file.read()
            resp_dict = json.loads(file_contents)
            return resp_dict
    except FileNotFoundError:
        print(f"The file '{file_path}' does not exist.")
    except IOError:
        print(f"An error occurred while reading the file '{file_path}'.")


@app.route(endpoint_call, methods=['POST'])
def process_file_endpoint():
    # Receive file path from client
    patient_dir = request.json.get("patient_dir")

    if not patient_dir:
        response = jsonify({'error': 'File path not provided'})
        response.headers['Content-Type'] = 'application/json'
        return response, 400

    if checkdir(patient_dir, bucket) and not patient_dir.endswith("mock"):
        response = jsonify({'error': 'File does not exist'})
        response.headers['Content-Type'] = 'application/json'
        return response, 404

    try:
        # to test with mock response
        if patient_dir.endswith("mock"):
            response = jsonify(mockresponse())
        else:
            response = jsonify(get_resp(getdcmfiles(patient_dir, bucket)))

        response.headers['Content-Type'] = 'application/json'
        return response, 200
    except Exception as e:
        response = jsonify({'error': str(e)})
        response.headers['Content-Type'] = 'application/json'
        return response, 500

if __name__ == "__main__":
    app.run(debug=True)

### TODO CURRENT ERROR: post request being made twice? look into why this happens