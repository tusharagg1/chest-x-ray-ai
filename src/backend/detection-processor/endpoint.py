#### command to download requirements
#### python -m pipreqs.pipreqs

from flask import Flask, request, jsonify
from PredictionModel.diagnosis import get_resp
from fbinterface import getdcmfiles, checkdir, initapp

endpoint_call = "/get-diagnosis"
bucket = initapp()
app = Flask(__name__)


@app.route(endpoint_call, methods=["POST"])
def process_file_endpoint():
    # Receive file path from client
    patient_dir = request.json.get("patient_dir")

    if not patient_dir:
        return jsonify({"error": "File path not provided"}), 400

    if checkdir(patient_dir, bucket):
        return jsonify({"error": "File does not exist"}), 404

    try:
        return jsonify(get_resp(getdcmfiles(patient_dir, bucket))), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
