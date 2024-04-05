## generate heatmaps and create an encoded object

import matplotlib.pyplot as plt
import skimage
import skimage.io
import skimage.filters
import torch
import torchvision
import io
import base64

import torchxrayvision as xrv
from PredictionModel.runPredModel import diseases


# generates heatmaps from raw image data
# each generated image has heatmaps for all diseases with labels
# by default, "all" weights used (all datasets trained in torchxrayvision)

def genheatmap(img, weights="densenet121-res224-all"):
    print("generating heatmaps...")
    img = xrv.datasets.normalize(img, 255)
    print("normalized. processing...")

    # Check that images are 2D arrays
    if len(img.shape) > 2:
        img = img[:, :, 0]
    if len(img.shape) < 2:
        print("error, dimension lower than 2 for image")

    # Add color channel
    img = img[None, :, :]

    transform = torchvision.transforms.Compose(
        [xrv.datasets.XRayCenterCrop(),
        xrv.datasets.XRayResizer(224, "cv2")]
    )

    print("transforming...")
    img = transform(img)
    img = torch.from_numpy(img).unsqueeze(0)
    model = xrv.models.get_model(weights)
    img = img.requires_grad_()

    my_dpi = 100
    fig, axs = plt.subplots(
        2,
        2,
        frameon=True,
        figsize=(4 * 224 / my_dpi, 4 * 224 / my_dpi),
        dpi=my_dpi,
    )

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

    print("heatmaps generated! saving response...")
    # Adjust layout and save as bytes
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    image_data = io.BytesIO()
    fig.savefig(
        image_data,
        format="PNG",
        dpi=my_dpi,
        bbox_inches="tight",
        pad_inches=0,
    )
    plt.close(fig)

    # store image as base64 encoding
    image_data.seek(0)
    img = image_data.getvalue()
    base64_image = base64.b64encode(img).decode("utf-8")
    print("response saved!")
    return base64_image


# wrapper function
def genheatmappatient(raw_imgs):
    return [genheatmap(img) for img in raw_imgs]
