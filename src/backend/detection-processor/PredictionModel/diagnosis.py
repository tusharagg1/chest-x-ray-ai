from PredictionModel.runPredModel import scanallxrays
from PredictionModel.convertDcm import get_xraypngs
from PredictionModel.heatmaps import genheatmappatient
from PredictionModel.reportsummary import genreport
from PredictionModel.convertDcm import getimgdata

# wrapper function to get raw image data for all the dicom x-rays
def get_raw_img(pdicoms):
    return [getimgdata(img) for img in pdicoms]


# creates response to send to endpoint
# arg: array of dicom x-rays in the form of a byte like object
def get_resp(pdicoms):

    raw_imgs = get_raw_img(pdicoms)

    preds = scanallxrays(raw_imgs)
    heatmaps = genheatmappatient(raw_imgs)
    xraypngs = get_xraypngs(raw_imgs)
    report = genreport(preds)

    response_data = {
        'predictions': preds,
        'report': report,
        'heatmaps': heatmaps,
        'xrayimgs': xraypngs,
        # success field for confirmation check on frontend
        'success': True
    }
    return response_data
