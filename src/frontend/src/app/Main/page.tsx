/*
* Author: Allison Cook
* Date Created: January 2024
* Purpose: Create the main application page display
*/
'use client';
/* eslint-disable @typescript-eslint/ban-ts-comment */
//ts comments stop errors that didn't effect compliation or function

import { useEffect } from "react";
import ReactDOMServer from 'react-dom/server';

import Button from '@/components/buttons/Button';

import { cols } from '@/app/components/patientColumns';
import Table from '@/app/components/table';

import { getAllPatientData, signOutAUser} from "../../../../backend/database/backend";

export default function MainPage() {
  // const [patientSelected] = useState(false);

  useEffect(() => {
    allPatientData();
  }, []);

  function search() {
    // go to patient search
    window.location.href = '/PatientSearch';
  }

  function newXrayStudy() {
    // go to the x-ray study page
    window.location.href = '/X-RayStudy';
  }

  if (typeof document !== 'undefined') {
    document.addEventListener(`click`, handle);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handle(evt: { target: any }) {
    // only do something if a checkbox was clicked
    if (evt.target.type === `checkbox`) {
      const isChecked = evt.target.checked;
      const selectedRow = evt.target.closest(`tr`);
  
      /* @ts-ignore */
      const tds = Array.from(selectedRow.cells).map((td) => td.textContent);
      // reset checkboxes, row coloring and disabled state
      document.querySelectorAll(`input[type='checkbox']`).forEach((cb) => {
        /* @ts-ignore */
        cb.checked = cb !== evt.target ? false : isChecked;
        const row = cb.closest(`tr`);
  
        /* @ts-ignore */
        row.classList[isChecked && row === selectedRow ? `add` : `remove`](
          'selected'
        );
      });
      return tds;
    }
  }

  //get patient data from database 
  function allPatientData() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = [];
    const patientDataTable = document.getElementById("patientDataTable");
    getAllPatientData()
      .then((patientData) => {
        for (let i = 0; i < patientData.length; i++) {
          const pd = patientData[i];
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        patientDataTable!.innerHTML = ReactDOMServer.renderToString(<Table data={items} columns={cols} />);
      })
      .catch(() => {
        //error
      });
  }

  //signout current active user
  const onSignOut = () => {
    const signOutTxt = document.getElementById("signOutSuccess");

    signOutAUser()
      .then((_userSignedOut) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        signOutTxt!.innerHTML = `Sign Out Successful! Goodbye!`;
        window.location.href = "/"; // login page
      })
      .catch((_error) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (signOutTxt!)
          signOutTxt.innerHTML = 'Sign Out Failed! Error in User Sign Out!';
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
        </header>
        <div className='layout relative flex flex-col items-center gap-5 py-2 text-center'>
          <div
            className='gap-2 bg-gray-100 p-5 pt-3'
            style={{ width: '90%', height: '60vh', zIndex: 5 }}
          >
            <h2 className='mb-5 text-indigo-500'>Recent Patients</h2>
            {/* display recent patients from database */}
            <div className='flex items-center justify-center text-center' id='patientDataTable'>
              <Table data={data()} columns={cols} />
            </div>
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
              height: '75%',
            }}
          >
            <div
              className='bg-indigo-500'
              style={{ width: '100%', height: '100%' }}
            ></div>
          </div>
          <div className='flex pt-5'>
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
        </div>
      </section>
    </main>
  );
}

