## interfacing with firebase cloud storage
## auth key sotred in seperate file

import firebase_admin
from firebase_admin import credentials, storage
import io
from PredictionModel.convertDcm import getfilenames


# app initializing function, called when endpoint is started
def initapp():
    authkeyfile = "chest-x-ray-ai-f0b4a-firebase-adminsdk-66zbu-a4dd8e15fb.json"
    cred = credentials.Certificate(authkeyfile)
    # Note: enter the the path for the private service key file above.
    # In this case it was stored in the detection-procesor folder
    app = firebase_admin.initialize_app(
        cred, {"storageBucket": "chest-x-ray-ai-f0b4a.appspot.com"}
    )

    bucket = storage.bucket()
    return bucket


def checkdir(patient_dir, bucket):
    return len(list(bucket.list_blobs(prefix=patient_dir))) == 0


def getdcmfiles(patient_dir, bucket):
    # gets list of paths of patient's dcm files
    # makes a list of dicom files as bytes
    dcmfiles_inbytes = []

    allfiles = [i.name for i in list(bucket.list_blobs(prefix=patient_dir))]
    dcmfiles = getfilenames(allfiles)
    for dcmfilepath in dcmfiles:
        blob = bucket.get_blob(dcmfilepath)
        dicom_as_bytes = io.BytesIO(blob.download_as_bytes())
        dcmfiles_inbytes.append(dicom_as_bytes)
    return dcmfiles_inbytes
