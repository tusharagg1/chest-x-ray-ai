#!/usr/bin/env python
# coding: utf-8

import os
import torch
import torchvision.transforms
import torchxrayvision as xrv
from PredictionModel.convertDcm import getfilenames, getimgdata

diseases = [
    "Atelectasis",
    "Pneumonia",
    "Cardiomegaly",
    "Pleural_Thickening",
]


# get predictions from a dcm x-ray
def getprediction(img_path, weights="densenet121-res224-all"):

    img = getimgdata(img_path)
    img = xrv.datasets.normalize(img, 255)

    # Check that images are 2D arrays
    if len(img.shape) > 2:
        img = img[:, :, 0]
    if len(img.shape) < 2:
        print("error, dimension lower than 2 for image")

    # Add color channel
    img = img[None, :, :]

    # the models will resize the input to the correct size so this is optional.
    transform = torchvision.transforms.Compose([xrv.datasets.XRayCenterCrop()])

    img = transform(img)
    model = xrv.models.get_model(weights)

    output = {}
    with torch.no_grad():
        img = torch.from_numpy(img).unsqueeze(0)
        preds = model(img).cpu()
        output["preds"] = dict(
            zip(xrv.datasets.default_pathologies, preds[0].detach().numpy())
        )

    allpreds = output.get("preds")
    predictions = {}
    if allpreds:
        for disease in diseases:
            predictions[disease] = allpreds.get(disease)
    else:
        print("results not found")
        return {}

    return predictions


# returns combined predictions for all dcm xrays in a directory
def scanallxrays(xraydir):

    # convertall(xraydir)

    xray_imgs = getfilenames(xraydir, ".dcm")
    allpreds = []

    for img in xray_imgs:
        preds = getprediction(os.path.join(xraydir, img))
        # print(os.path.join(xraydir, img))
        allpreds.append(preds)

    if len(allpreds) > 1:

        finalpreds = {}
        pnum = len(allpreds)
        diseases = allpreds[0].keys()
        for disease in diseases:
            # taking avg value of predictions for all diseases
            combined_preds = (
                sum([allpreds[i][disease] for i in range(pnum)]) / pnum
            )
            finalpreds[disease] = combined_preds
        return finalpreds
    else:
        return allpreds[0]
