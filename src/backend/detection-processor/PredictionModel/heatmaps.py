import matplotlib.pyplot as plt
import skimage
import skimage.io

import torch
import torchvision

import torchxrayvision as xrv
from PredictionModel.convertDcm import getimgdata
from PredictionModel.runPredModel import diseases


def genheatmap(img_path, pathology):

    img = getimgdata(img_path)
    img = xrv.datasets.normalize(img, 255)

    # Check that images are 2D arrays
    if len(img.shape) > 2:
        img = img[:, :, 0]
    if len(img.shape) < 2:
        print("error, dimension lower than 2 for image")

    # Add color channel
    img = img[None, :, :]

    transform = torchvision.transforms.Compose(
        [xrv.datasets.XRayCenterCrop(), xrv.datasets.XRayResizer(224)]
    )

    img = transform(img)
    img = torch.from_numpy(img).unsqueeze(0)

    model = xrv.models.get_model("densenet121-res224-all")

    # choose the pathology for which to generate heatmaps
    target = model.pathologies.index(pathology)

    img = img.requires_grad_()

    # run model on the image
    outputs = model(img)
    print(outputs[:, target])
    grads = torch.autograd.grad(outputs[:, target], img)[0][0][0]
    blurred = skimage.filters.gaussian(
        grads.detach().cpu().numpy() ** 2, sigma=(5, 5), truncate=3.5
    )

    my_dpi = 100
    fig = plt.figure(
        frameon=False, figsize=(224 / my_dpi, 224 / my_dpi), dpi=my_dpi
    )
    ax = plt.Axes(fig, [0.0, 0.0, 1.0, 1.0])
    ax.set_axis_off()
    fig.add_axes(ax)
    ax.imshow(img[0][0].detach().cpu().numpy(), cmap="gray", aspect="auto")
    ax.imshow(blurred, alpha=0.5)

    fig.savefig(
        "overlay_image.png", dpi=my_dpi, bbox_inches="tight", pad_inches=0
    )
    plt.close(fig)
    # TODO: generate image with heatmaps for all diseases
