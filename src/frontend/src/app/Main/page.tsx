'use client';

import { useState } from 'react';

import Button from '@/components/buttons/Button';

import cols from '@/app/components/patientColumns';
// import { Patient } from "@/app/components/patientColumns";
import Table from '@/app/components/table';

export default function MainPage() {
  const [username, setUser] = useState('username');

  //get database username
  setUser('username');

  function search() {
    //go to patient search
    window.location.href = 'http://localhost:3000/PatientSearch';
  }

  function newUpload() {
    //go to the upload patient data page
    window.location.href = 'http://localhost:3000/NewPatient';
  }

  function newXrayStudey() {
    //go to the x-ray study page
    window.location.href = 'http://localhost:3000/X-RayStudy';
  }

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
    <main className='min-h-screen bg-indigo-100'>
      <header className='mb-2 justify-center text-center'>
        <h1 className='text-m py-2 text-indigo-500 '>Welcome {username}!</h1>
      </header>
      <div className='layout relative flex min-h-screen flex-col items-center gap-5 py-2 text-center'>
        <div
          className='gap-2 bg-gray-100 p-5 px-5'
          style={{ width: '85%', height: '53vh', zIndex: 5 }}
        >
          <h2 className='mb-5 text-indigo-500'>Recent Patients</h2>
          <div className='flex items-center justify-center text-center'>
            <Table data={data()} columns={cols} />
          </div>
        </div>
        <div
          style={{
            paddingLeft: '2%',
            paddingTop: '2%',
            position: 'absolute',
            zIndex: 3,
            width: '87%',
            height: '55%',
          }}
        >
          <div
            className='bg-indigo-500 '
            style={{ width: '100%', height: '100%' }}
          ></div>
        </div>
        <Button onClick={search} variant='primary' size='base' className='mt-5'>
          Search for Patient
        </Button>
        <Button
          onClick={newUpload}
          variant='primary'
          size='base'
          // style={{'width' : '22%'}}
        >
          Upload new Patient
        </Button>
        <Button
          onClick={newXrayStudey}
          variant='primary'
          size='base'
          // style={{'width' : '22%'}}
        >
          New X-ray Study
        </Button>
      </div>
    </main>
  );
}
