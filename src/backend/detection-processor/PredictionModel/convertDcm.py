## image processing for effective storage and communication with frontend

import pydicom
import numpy as np
import pydicom
from PIL import Image
import io
import base64


def lin_stretch_img(img, low_prc, high_prc, do_ignore_minmax=True):
    """
    Apply linear "stretch" - low_prc percentile goes to 0,
    and high_prc percentile goes to 255.
    The result is clipped to [0, 255] and converted to np.uint8.

    Additional feature:
    When computing high and low percentiles, ignore the minimum and maximum
    intensities (assumed to be outliers).
    """
    # For ignoring the outliers, replace them with the median value
    if do_ignore_minmax:
        tmp_img = img.copy()
        med = np.median(img)  # Compute median
        tmp_img[img == img.min()] = med
        tmp_img[img == img.max()] = med
    else:
        tmp_img = img

    lo, hi = np.percentile(
        tmp_img, (low_prc, high_prc)
    )  # Example: 1% - Low percentile, 99% - High percentile

    if lo == hi:
        return np.full(
            img.shape, 128, np.uint8
        )  # Protection: return gray image if lo = hi.

    stretch_img = (img.astype(float) - lo) * (
        255 / (hi - lo)
    )  # Linear stretch: lo goes to 0, hi to 255.
    stretch_img = stretch_img.clip(0, 255).astype(
        np.uint8
    )  # Clip range to [0, 255] and convert to uint8
    return stretch_img


# returns raw image data from dicom bytes
def getimgdata(dcmdata):
    ds = pydicom.dcmread(dcmdata, force=True)
    img = ds.pixel_array
    img = lin_stretch_img(img, 1, 99)

    return img


# returns filenames in a directory that have given extension (example: ".dcm")
def getfilenames(file_list, extension=".dcm"):
    return [filename for filename in file_list if filename.endswith(extension)]


# function to return base64 encoded png files
# arg: raw img data
def getencodedimg(img_array):
    img = Image.fromarray(img_array)
    img_bytes_io = io.BytesIO()

    # compressed to jpeg as the xrays are high resolution
    img.save(img_bytes_io, format="JPEG")
    img_bytes_io.seek(0)
    image_data = img_bytes_io.getvalue()
    base64_image = base64.b64encode(image_data).decode("utf-8")
    return base64_image


# wrapper function to return encoded xray images
def get_xraypngs(raw_imgs):
    return [getencodedimg(img_array) for img_array in raw_imgs]
