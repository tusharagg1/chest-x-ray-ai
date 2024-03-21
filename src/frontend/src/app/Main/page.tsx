'use client';

import { useState } from 'react';

import Button from '@/components/buttons/Button';

import cols from '@/app/components/patientColumns';
// import { Patient } from "@/app/components/patientColumns";
import Table from '@/app/components/table';

import {
  getCurrentUser,
  signOutAUser,
} from '../../../../backend/database/backend';

export default function MainPage() {
  const [username, setUser] = useState('username');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientSelected, setPatietnSelected] = useState(false);

  async function load() {
    //get database username
    setUser(await getCurrentUser());
  }

  function search() {
    //go to patient search
    window.location.href = '/PatientSearch';
  }

  function newXrayStudy() {
    //go to the x-ray study page
    window.location.href = '/X-RayStudy';
  }

  const onSignOut = () => {
    // const signOutBtn = document.getElementById("signOutBtn");
    const signOutTxt = document.getElementById('signOutSuccess');

    signOutAUser()
      .then((_userSignedOut) => {
        signOutTxt!.innerHTML = `Sign Out Successful! Goodbye ${username}!`;
        // setTimeout(() => {}, 1000);
        window.location.href = '/'; //home page
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
      Contact: '111-111-111',
      ReferringP: 'Spencer Smith',
      LastVisit: '2023-11-03',
      Selected: false
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
          'radial-gradient(circle, rgb(224, 231, 255), rgb(165 180 252))',
      }}
    >
      <section>
      <header className='mb-2 justify-center text-center' onLoad={load}>
        <h1 className='text-m py-2 text-indigo-500'>Welcome {username}!</h1>
      </header>
      <div className='layout relative flex flex-col items-center gap-5 py-2 text-center'>
        <div
          className='gap-2 bg-gray-100 p-5 px-5 pt-3'
          style={{ width: '85%', height: '60vh', zIndex: 5 }}
        >
          <h2 className='mb-5 text-indigo-500'>Recent Patients</h2>
          <div className='flex items-center justify-center text-center'>
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
            zIndex: 3,
            width: '87%',
            height: '77%',
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
            disabled={!patientSelected}
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
