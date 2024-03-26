from PredictionModel.runPredModel import scanallxrays
from PredictionModel.convertDcm import get_xraypngs
from PredictionModel.heatmaps import genheatmappatient
from PredictionModel.reportsummary import genreport
from PredictionModel.convertDcm import getimgdata


def get_rawimg(pdicoms):
    return [getimgdata(img) for img in pdicoms]

def get_resp(pdicoms):

    raw_imgs = get_rawimg(pdicoms)

    preds = scanallxrays(raw_imgs)
    heatmaps = genheatmappatient(raw_imgs)
    xraypngs = get_xraypngs(raw_imgs)
    report = genreport(preds)

    response_data = {
        'predictions': preds,
        'report': report,
        'heatmaps': heatmaps,
        'xrayimgs': xraypngs,
        'success': True
    }
    return response_data
