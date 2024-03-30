#!/usr/bin/env python
# coding: utf-8

import torch
import torchvision.transforms
import torchxrayvision as xrv

# list of diseases that are checked
diseases = [
    "Atelectasis",
    "Pneumonia",
    "Cardiomegaly",
    "Pleural_Thickening",
]


# get predictions from raw image data
# by default, "all" weights used (all datasets trained in torchxrayvision)

def getprediction(img, weights="densenet121-res224-all"):

    disease_index_dict = dict(
        zip(
            diseases,
            [
                xrv.datasets.default_pathologies.index(diseases[i])
                for i in range(len(diseases))
            ],
        )
    )

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
        allpreds = dict(
            zip(
                diseases,
                [preds[0].detach().numpy()[i] for i in disease_index_dict.values()],
            )
        )

    return allpreds



# Returns combined predictions for all dcm xrays in a directory.
# Args: xraydir: Path to the directory containing the x-ray images.
def scanallxrays(raw_imgs):
    allpreds = []

    for img in raw_imgs:
        preds = getprediction(img)
        print(f"gotpreds!\n{preds}") # print for debug
        allpreds.append(preds)

    # if there are multiple images, prediction is the avg value
    if len(allpreds) > 1:
        finalpreds = {}
        pnum = len(allpreds)
        diseases = allpreds[0].keys()
        for disease in diseases:
            combined_preds = sum([allpreds[i][disease] for i in range(pnum)]) / pnum
            finalpreds[disease] = combined_preds
        return finalpreds
    else:
        return allpreds[0]
