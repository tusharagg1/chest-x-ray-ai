'use client';

import { useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';

import Button from '@/components/buttons/Button';

import { cols } from '@/app/components/patientColumns';
// import { Patient } from "@/app/components/patientColumns";
import Table from '@/app/components/table';

import { getAPatientsData, getAllPatientData, signOutAUser, getCurrentUser, getCurrentUserAfterInitAuth, setActivePatientID } from "../../../../backend/database/backend";

export default function MainPage() {
  const [username, setUser] = useState(() => {
    getCurrentUserAfterInitAuth()
      .then((user) => {
        if (user != null) {
          return user.userName;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return 'username';
  });
  const [selectedPatientId, setSelectedPatientId] = useState(0);
  const [patientSelected, setPatientSelected] = useState(false);

  useEffect(() => {
    // getUsername();
    allPatientData();
  }, []);

  function getUsername() {
    // get database username
    getCurrentUser()
      .then((user) => {
        if (user != null) {
          setUser(user.userName);
        }
      });
  }

  function search() {
    // go to patient search
    window.location.href = '/PatientSearch';
  }

  function newUpload() {
    // go to the upload patient data page
    window.location.href = '/NewPatient';
  }

  function newXrayStudy() {
    // go to the x-ray study page
    window.location.href = '/X-RayStudy';
  }

  function allPatientData() {
    const items: any[] = [];
    const patientDataTable = document.getElementById("patientDataTable");
    getAllPatientData()
      .then((patientData) => {
        for (let i = 0; i < patientData.length; i++) {
          let pd = patientData[i];
          items.push({
            PatientID: pd.patientID,
            MRN: pd.mrn,
            Name: pd.firstName + " " + pd.lastName,
            DOB: pd.dob,
            Gender: pd.gender,
            Contact: pd.contact,
            ReferringP: pd.refPhys,
            LastVisit: pd.lastVisit,
            Selected: false
          });
        }
        patientDataTable!.innerHTML = ReactDOMServer.renderToString(<Table data={items} columns={cols} />);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // use this function to set active patient id
  function selectPatient(patientID: number) {
    setActivePatientID(patientID)
      .then((setSuccess) => {
        console.log(setSuccess);
        setSelectedPatientId(patientID);
        setPatientSelected(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onSignOut = () => {
    const signOutBtn = document.getElementById("signOutBtn");
    const signOutTxt = document.getElementById("signOutSuccess");

    signOutAUser()
      .then((_userSignedOut) => {
        signOutTxt!.innerHTML = `Sign Out Successful! Goodbye ${username}!`;
        setTimeout(() => {}, 1000);
        window.location.href = "/"; // login page
      })
      .catch((_error) => {
        if (signOutTxt!)
          signOutTxt.innerHTML = 'Sign Out Failed! Error in User Sign Out!';
        // eslint-disable-next-line no-console
        console.log('Error in User Sign Out!');
      });
  };

  const data = () => {
    const items = [];
    items.push({
      PatientID: 1,
      MRN: 123,
      Name: 'Jack Mean',
      DOB: '2000-10-30',
      Gender: 'M',
      Contact: '111-111-1111',
      ReferringP: 'Dr. Spencer Smith',
      LastVisit: '2023-11-03',
      Selected: false,
    });
    for (let i = 1; i < 4; i++) {
      items.push({
        PatientID: null,
        MRN: null,
        Name: '-',
        DOB: '-',
        Gender: '-',
        Contact: '-',
        ReferringP: '-',
        LastVisit: '-',
        Selected: false,
      });
    }
    return items;
  };

  return (
    <main
      className='min-h-screen bg-indigo-100'
      style={{
        backgroundImage:
          'linear-gradient(to bottom right, rgb(224, 231, 255), rgb(165, 180, 252))',
      }}
    >
      <section>
        <header className='mb-2 justify-center text-center'>
          <h1 className='text-m py-2 text-indigo-500'>Welcome!</h1>
          {/* <br></br>
          <Button onClick={getUsername} variant='primary' size='base'>Verify User</Button> */}
        </header>
        <div className='layout relative flex flex-col items-center gap-5 py-2 text-center'>
          <div
            className='gap-2 bg-gray-100 p-5 pt-3'
            style={{ width: '90%', height: '60vh', zIndex: 5 }}
          >
            <h2 className='mb-5 text-indigo-500'>Recent Patients</h2>
            <div className='flex items-center justify-center text-center' id='patientDataTable'>
              <Table data={data()} columns={cols} />
            </div>
            {/* <Button
              onClick={allPatientData}
              variant='primary'
              size='base'
              className='mt-5'
            >
              Refresh Recent Patients
            </Button>
            <br></br> */}
            <Button
              onClick={search}
              variant='primary'
              size='base'
              className='mt-5'
            >
              Search for More Patients
            </Button>
          </div>
          <div
            style={{
              paddingLeft: '2%',
              paddingTop: '2%',
              position: 'absolute',
              zIndex: 1,
              width: '92%',
              height: '70%',
            }}
          >
            <div
              className='bg-indigo-500'
              style={{ width: '100%', height: '100%' }}
            ></div>
          </div>
          <div className='flex'>
            <Button
              onClick={newXrayStudy}
              variant='primary'
              size='base'
              // disabled={!patientSelected}
            >
              X-ray Study
            </Button>
          </div>
          <div className='flex'>
            <Button onClick={onSignOut} variant='primary' size='base'>
              Log Out
            </Button>
            <label id='signOutSuccess'></label>
          </div>
          <div className='flex'>
            <Button onClick={() => {selectPatient(8); setPatientSelected(true);}} variant='primary' size='base'>
              Select Patient
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
function componentDidMount() {
  throw new Error('Function not implemented.');
}

