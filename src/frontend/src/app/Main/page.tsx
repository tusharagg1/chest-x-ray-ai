'use client';

import { useState } from "react";
import ReactDOMServer from 'react-dom/server';

import Button from '@/components/buttons/Button';

import cols from '@/app/components/patientColumns';
// import { Patient } from "@/app/components/patientColumns";
import Table from '@/app/components/table';

import { getAPatientsData, getAllPatientData, signOutAUser, getCurrentUser } from "../../../../backend/database/backend";

export default function MainPage() { 
  const [username, setUser] = useState('username');

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
            LastVisit: pd.lastVisit
          });
        }
        patientDataTable!.innerHTML = ReactDOMServer.renderToString(<Table data={items} columns={cols} />);
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
        window.location.href = "/Login";
      })
      .catch((_error) => {
        signOutTxt!.innerHTML = "Sign Out Failed! Error in User Sign Out!";
        console.log("Error in User Sign Out!");
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
      Contact: '111-111-111',
      ReferringP: 'Spencer Smith',
      LastVisit: '2023-11-03',
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
      });
    }
    return items;
  };

  return (
    <main className='bg-indigo-100 min-h-screen'>
      <header className='mb-2 justify-center text-center'>
          <h1 className='py-2 text-m text-indigo-500'>Welcome {username}!</h1>
          <br></br>
          <Button onClick={getUsername} variant='primary' size='base'>Verify User</Button>
      </header>
      <div className='layout relative flex min-h-screen flex-col items-center gap-5 py-2 text-center'>
        <div className='gap-2 bg-gray-100 p-5 px-5' style={{ width: '85%', height: '53vh', zIndex: 5 }}>
          <h2 className='text-indigo-500 mb-5'>Recent Patients</h2>
          <div className="flex items-center text-center justify-center" id="patientDataTable">
            <Table data={data()} columns={cols} />
          </div>
          <br></br>
          <Button onClick={allPatientData} variant='primary' size='base'>Refresh Recent Patients</Button>
        </div>
        <div style={{ paddingLeft: '2%', paddingTop: '2%', position: 'absolute', zIndex: '3', "width": "87%", "height": "55%" }}>
          <div className='bg-indigo-500 ' style={{ "width": "100%", "height": "100%" }}></div>
          <div>
            <Button onClick={search} variant='primary' size='base' className="mt-5">
              Search for Patient
            </Button>
            <br></br>
            <br></br>
            <Button onClick={newUpload} variant='primary' size='base' disabled>
              Upload new Patient (Disabled)
            </Button>
            <br></br>
            <br></br>
            <Button onClick={newXrayStudy} variant='primary' size='base'>
              New X-ray Study
            </Button>
            <br></br>
            <br></br>
            <Button onClick={onSignOut} variant='primary' size='base'>
              Log Out
            </Button>
            <label id="signOutSuccess"></label>
          </div>
        </div>
      </div>
    </main>
  );
}
