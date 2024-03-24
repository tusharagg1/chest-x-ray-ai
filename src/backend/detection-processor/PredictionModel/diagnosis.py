import os
from PredictionModel.runPredModel import scanallxrays
from PredictionModel.convertDcm import convertall
from PredictionModel.heatmaps import genheatmappatient
from PredictionModel.reportsummary import genreport
from PredictionModel.convertDcm import getimgdata


def get_predictions(raw_imgs):
    return scanallxrays(raw_imgs)

def get_heatmaps(raw_imgs):
    return genheatmappatient(raw_imgs)

def get_report(preds):
    return genreport(preds)

def get_rawimg(pdicoms):
    return [getimgdata(img) for img in pdicoms]

def get_resp(pdicoms):

    raw_imgs = get_rawimg(pdicoms)

    preds = get_predictions(raw_imgs)
    heatmaps = get_heatmaps(raw_imgs)

    report = get_report(preds)

    response_data = {
        'predictions': preds,
        'report': report,
        'heatmaps': heatmaps
    }
    return response_data
