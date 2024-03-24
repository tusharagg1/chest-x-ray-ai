import firebase_admin
from firebase_admin import credentials, storage
import io
from PredictionModel.convertDcm import getfilenames


#dcmpathfb = "patient data/p013" # dicom file


def initapp():
    cred = credentials.Certificate("chest-x-ray-ai-f0b4a-firebase-adminsdk-66zbu-a4dd8e15fb.json")
    # Note: enter the the path for the private service key file above.
    # In this case it was stored in the detection-procesor folder
    app = firebase_admin.initialize_app(cred, {"storageBucket": "chest-x-ray-ai-f0b4a.appspot.com"})
    
    bucket = storage.bucket()
    return bucket

def checkdir(patient_dir, bucket):
    return len(list(bucket.list_blobs(prefix=patient_dir)))==0


def getdcmfiles(patient_dir, bucket):
    # get list of paths of patient's dcm files
    # make a list of dicom bytes and return
    dcmfiles_inbytes = []

    allfiles = [i.name for i in list(bucket.list_blobs(prefix=patient_dir))]
    dcmfiles = getfilenames(allfiles)
    for dcmfilepath in dcmfiles:
        blob = bucket.get_blob(dcmfilepath)
        dicom_as_bytes = io.BytesIO(blob.download_as_bytes())
        dcmfiles_inbytes.append(dicom_as_bytes)
    return dcmfiles_inbytes

#checkdir(dcmpathfb)


'''
dcmpath = "patient-data/p001/p001.dcm" # dicom file

imgdata = io.BytesIO(getimgdata(dcmpath))
# WRITE IMG DATA AS AN IMG FILE IN FB
# create simplest BytesIO object
blob = bucket.blob("heatmap.png")
# upload with type zip
blob.upload_from_file(imgdata,content_type='image/png')
'''

#arr = np.frombuffer(blob.download_as_string(), np.uint8)
#img = cv2.imdecode(arr, cv2.COLOR_BGR2BGR555) # png image data
#cv2.imwrite(filename, img)

#firebase_storage = pyrebase.initialize_app(firebaseConfig)

#storage = firebase_storage.storage()

# send image to firebase
#storage.child("pic to store in fb").put("target path file name")

# download file from firebase
#storage.child("file path to download").download("path to store locally")


# get list of files from fb
'''
all_files = storage.list_files()
for file in all_files:
    print(file.name)
    #file.download_to_filename("filename path in local")
'''