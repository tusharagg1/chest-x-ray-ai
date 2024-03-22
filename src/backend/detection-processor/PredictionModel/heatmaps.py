import matplotlib.pyplot as plt
import skimage
import skimage.io
import skimage.filters
import torch
import torchvision
import os

import torchxrayvision as xrv
from PredictionModel.convertDcm import getfilenames, getimgdata
from PredictionModel.runPredModel import diseases


def genheatmap(img_path):

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
        [xrv.datasets.XRayCenterCrop(), xrv.datasets.XRayResizer(224, "cv2")]
    )

    img = transform(img)
    img = torch.from_numpy(img).unsqueeze(0)

    model = xrv.models.get_model("densenet121-res224-all")

    # choose the pathology for which to generate heatmaps
    #target = model.pathologies.index(pathology)

    img = img.requires_grad_()

    my_dpi = 100
    fig, axs = plt.subplots(2, 2, frameon=True, figsize=(4*224 / my_dpi, 4*224 / my_dpi), dpi=my_dpi)

    # making heatmap for each disease
    for i, target in enumerate(diseases):
        # Run model on the image
        outputs = model(img)
        grads = torch.autograd.grad(outputs[:, i], img)[0][0][0]
        blurred = skimage.filters.gaussian(
            grads.detach().cpu().numpy() ** 2, sigma=(5, 5), truncate=3.5
        )

        # Plot the image and heatmap in the corresponding subplot
        ax = axs[i // 2, i % 2]
        ax.set_axis_off()
        ax.imshow(img[0][0].detach().cpu().numpy(), cmap="gray", aspect="auto")
        ax.imshow(blurred, alpha=0.5)
        ax.set_title(target)
    
    fig.suptitle(f'{os.path.basename(img_path)[:-4]}', fontsize=35)

    # Adjust layout
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    #plt.tight_layout()
    fig.savefig(
        img_path[:-4]+'_heatmaps.png', dpi=my_dpi, bbox_inches="tight", pad_inches=0
    )
    plt.close(fig)


def genheatmappatient(patientdir):
    xray_imgs = getfilenames(patientdir, ".dcm")
    for img in xray_imgs:
        genheatmap(os.path.join(patientdir, img))