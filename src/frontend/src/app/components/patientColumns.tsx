/*
 * Author: Allison Cook
 * Date Created: January 2024
 * Purpose: Create type and column defintions used for table elements for patient information
 */

type Patient = {
  PatientID: number | null;
  MRN: number | null;
  Name: string;
  DOB: string;
  Gender: string;
  Contact: string;
  ReferringP: string;
  LastVisit: string;
  Selected: boolean;
};

type PatientInfo = {
  PatientID: number | null;
  MRN: number | null;
  Name: string;
  DOB: string;
  Gender: string;
  Contact: string;
  ReferringP: string;
  LastVisit: string;
};

type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number | string;
};

const cols: ColumnDefinitionType<Patient, keyof Patient>[] = [
  {
    key: 'PatientID',
    header: 'Patient ID',
  },
  {
    key: 'MRN',
    header: 'MRN',
  },
  {
    key: 'Name',
    header: 'Name',
  },
  {
    key: 'DOB',
    header: 'D.O.B',
  },
  {
    key: 'Gender',
    header: 'Gender',
  },
  {
    key: 'Contact',
    header: 'Contact',
  },
  {
    key: 'ReferringP',
    header: 'Referring Physician',
    width: '15%',
  },
  {
    key: 'LastVisit',
    header: 'Last Visit',
  },
  {
    key: 'Selected',
    header: 'Selected',
  },
];

const colsInfo: ColumnDefinitionType<PatientInfo, keyof PatientInfo>[] = [
  {
    key: 'PatientID',
    header: 'Patient ID',
  },
  {
    key: 'MRN',
    header: 'MRN',
  },
  {
    key: 'Name',
    header: 'Name',
  },
  {
    key: 'DOB',
    header: 'D.O.B',
  },
  {
    key: 'Gender',
    header: 'Gender',
  },
  {
    key: 'Contact',
    header: 'Contact',
  },
  {
    key: 'ReferringP',
    header: 'Referring Physician',
    width: '15%',
  },
  {
    key: 'LastVisit',
    header: 'Last Visit',
  },
];

export { cols, colsInfo };
