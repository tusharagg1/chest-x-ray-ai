'use client';
import { useState } from 'react';
import React from 'react';

import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';

import cols from '@/app/components/patientRows';
import Table from '@/app/components/tableSingle';

export default function PatientRecord() {
  // const [notes, setNotes] = useState('\n Image observations, other notes');
  // const [imageName, setImageName] = useState('/images/case1_008.jpg');
  // const [hasImage, setHasImage] = useState(true);
  // const [date, setDate] = useState('2023-11-03');
  const [missingInfo, setMissingInfo] = useState('none');

  const data = () => {
    const info = [];
    info.push({
      Title: 'Patient ID',
      Value: '-',
    });
    info.push({
      Title: 'MRN',
      Value: '-',
    });
    info.push({
      Title: 'Name',
      Value: '-',
    });
    info.push({
      Title: 'D.O.B',
      Value: '-',
    });
    info.push({
      Title: 'Gender',
      Value: '-',
    });
    info.push({
      Title: 'Referring Referring Physician',
      Value: '-',
    });
    info.push({
      Title: 'Last Visit',
      Value: '-',
    });
    info.push({
      Title: 'Notes',
      Value: '',
    });
    return info;
  };
  function upload() {
    //get any other previous data
  }

  function verify() {
    //check all needed info is there
    setMissingInfo('none');
  }

  return (
    <main className='bg-indigo-100'>
      <header className='mb-2'>
        <UnderlineLink href='/Main' className='px-8 text-indigo-500'>
          Main
        </UnderlineLink>
        <h1 className='text-m justify-center  text-center text-indigo-500'>
          New Patient Record
        </h1>
      </header>
      <section className='bg-indigo-100 py-2'>
        <div className='layout flex min-h-screen py-2'>
          <div
            style={{ width: '45%', height: '80vh', zIndex: 5 }}
            className='bg-white text-indigo-500'
          >
            <h3 className='text-center'>Patient Record</h3>
            <Table data={data()} columns={cols} />
            <form>
              <input type='file' accept='.dcm' placeholder='Choose File...' />
              <Button onClick={upload} variant='primary' size='sm'>
                Upload
              </Button>
            </form>
          </div>
          <div
            style={{
              paddingLeft: '1%',
              paddingTop: '1%',
              position: 'absolute',
              zIndex: 3,
              width: '40%',
              height: '82%',
            }}
          >
            <div
              className='bg-indigo-500 '
              style={{ width: '100%', height: '100%' }}
            ></div>
          </div>
          <div
            style={{
              width: '40%',
              height: '30vh',
              zIndex: 5,
              position: 'absolute',
              right: 0,
              paddingRight: '4%',
            }}
            className='flex gap-2 text-indigo-500'
          >
            <div className='bg-white' style={{ width: '100%', height: '100%' }}>
              <ol className='space-y-3'>
                <h3 className='text-center'>Missing Information</h3>
                <p
                  className=''
                  style={{ fontWeight: 'bold', paddingLeft: '3%' }}
                >
                  {missingInfo}
                </p>
                <div className='justify-center py-5 text-center '>
                  <Button onClick={verify} variant='primary' size='base'>
                    Verify
                  </Button>
                </div>
              </ol>
            </div>
          </div>
          <div
            style={{
              paddingRight: '3%',
              paddingTop: '1%',
              position: 'absolute',
              zIndex: 3,
              width: '39%',
              height: '32%',
              right: 0,
            }}
          >
            <div
              className='bg-indigo-500 '
              style={{ width: '100%', height: '100%' }}
            ></div>
          </div>
        </div>
      </section>
    </main>
  );
}
