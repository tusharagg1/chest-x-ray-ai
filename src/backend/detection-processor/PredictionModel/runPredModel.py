#!/usr/bin/env python
# coding: utf-8

import torch
import torchvision.transforms
import torchxrayvision as xrv

diseases = [
    "Atelectasis",
    "Pneumonia",
    "Cardiomegaly",
    "Pleural_Thickening",
]


# get predictions from a dcm x-ray
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

    # img = getimgdata(img_bytes)
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


def scanallxrays(raw_imgs):
    """
    Returns combined predictions for all dcm xrays in a directory.

    Args:
        xraydir (str): Path to the directory containing the x-ray images.

    Returns:
        dict: Dictionary containing combined predictions for each disease.
    """

    allpreds = []

    for img in raw_imgs:
        preds = getprediction(img)
        print(f"gotpreds!\n{preds}")
        allpreds.append(preds)

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
