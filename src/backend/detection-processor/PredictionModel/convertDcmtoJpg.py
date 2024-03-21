import cv2
import pydicom
import numpy as np
import os

def lin_stretch_img(img, low_prc, high_prc, do_ignore_minmax=True):
    """ 
    Apply linear "stretch" - low_prc percentile goes to 0, 
    and high_prc percentile goes to 255.
    The result is clipped to [0, 255] and converted to np.uint8

    Additional feature:
    When computing high and low percentiles, ignore the minimum and maximum intensities (assumed to be outliers).
    """
    # For ignoring the outliers, replace them with the median value
    if do_ignore_minmax:
        tmp_img = img.copy()
        med = np.median(img)  # Compute median
        tmp_img[img == img.min()] = med
        tmp_img[img == img.max()] = med
    else:
        tmp_img = img

    lo, hi = np.percentile(tmp_img, (low_prc, high_prc))  # Example: 1% - Low percentile, 99% - High percentile

    if lo == hi:
        return np.full(img.shape, 128, np.uint8)  # Protection: return gray image if lo = hi.

    stretch_img = (img.astype(float) - lo) * (255/(hi-lo))  # Linear stretch: lo goes to 0, hi to 255.
    stretch_img = stretch_img.clip(0, 255).astype(np.uint8)  # Clip range to [0, 255] and convert to uint8
    return stretch_img


def getimgdata(dcmpath):

    ds = pydicom.dcmread(dcmpath)
    img = ds.pixel_array # get image array

    img = lin_stretch_img(img, 1, 99)  # Apply "linear stretching" (lower percentile 1 goes to 0, and percentile 99 to 255).

    return img
    # TODO: save jpg file in database
    #cv2.imwrite(target, img)


# returns filenames in a directory that have given extension
def getfilenames(directory, extension):
    
    filenames = []
    try:
        for filename in os.listdir(directory):
            if filename.endswith(extension):
                filenames.append(filename)
    except IOError:
        print(f"'{directory}': No such directory")
    
    return filenames


# function to save a jpg file in target path
def convertdcmtojpg(dcmpath, target):
    img = getimgdata(dcmpath)
    cv2.imwrite(target, img)


# saves a jpg conversion of all dcm files in given dir.
def convertall(dcmdir):

    dcmfiles = getfilenames(dcmdir, '.dcm')
    for img in dcmfiles:
        dcmpath = os.path.join(dcmdir, img)
        target = os.path.join(dcmdir, img[:-3]+'jpg')
        convertdcmtojpg(dcmpath,target)