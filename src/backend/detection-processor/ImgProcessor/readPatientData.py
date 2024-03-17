import pandas as pd


def readPatientData(csvpath):
    return pd.read_csv(csvpath)
