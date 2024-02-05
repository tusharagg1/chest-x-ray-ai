'use client';
import Link from 'next/link';
import { useState } from 'react';
import React from 'react';

import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';
import NextImage from '@/components/NextImage';

import cols from '@/app/components/patientRows';
import Table from '@/app/components/tableSingle';

export default function PatientRecord() {

    const [notes, setNotes] = useState('\n Image observations, other notes');
    const [imageName, setImageName] = useState('/images/case1_008.jpg');
    const [hasImage, setHasImage] = useState(true);
    const [date, setDate] = useState('2023-11-03');

   const data = () => {
    const info = [];
    info.push({
      Title: "Patient ID",
      Value: 1,
    })
    info.push({
        Title: "MRN",
        Value: 123,
    })
    info.push({
        Title: "Name",
        Value: "Jack Mean",
    })
    info.push({
        Title: "D.O.B",
        Value: '2000-10-30',
      })
    info.push({
        Title: "Gender",
        Value: "M",
      })
    info.push({
        Title: "Referring Referring Physician",
        Value: "Spencer Smith",
      })
    info.push({
        Title: "Last Visit",
        Value: '2023-11-03'
    })
    return info;
   }

   const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDate(event.target.value)
  }  

   function updateTo() {
    //get any other previous data
   }

   function newStudy() {
    //go to the new study page
    window.location.href = "http://localhost:3000/X-RayStudy"
   }

  return (
    <main className='bg-indigo-100'>
    <UnderlineLink href='/Main' className='text-indigo-500 px-8'>Main</UnderlineLink>
      <header className='mb-2 justify-center text-center' >
        <h1 className='py-2 text-m text-indigo-500 '>Patient Records</h1>
      </header>
      <section className='py-2 bg-indigo-100'>
        <div className='layout flex min-h-screen py-2'>
            <div style={{width: '45%', height: '80vh', zIndex: '5'}} className='text-indigo-500 bg-white'>
                <h3 className='text-center'>Patient Record</h3>
                <Table data={(data())} columns={cols} />
                <p className='mx-2'><b>Selected Visit Notes:</b> {notes}</p>
                <div className='justify-center items-center text-center pt-5'>
                  <form>
                  <select value={date} onChange={handleChange}>
                  <option value="2023-11-03">Last Visit</option>
                  <option value="2023-05-10">2023-05-10</option>
                  <option value="2022-10-15">2022-10-15</option>
                  </select>
                  </form>
                </div>
            </div>
            <div className='bg-white' style={{"width" : "100%", "height" : "100%"}}></div>
            <div style={{paddingLeft: '1%', paddingTop: '1%', position: 'absolute', zIndex: '3', "width" : "40%", "height" : "82%"}}>
              <div className='bg-indigo-500 ' style={{"width" : "100%", "height" : "100%"}}></div>
            </div> 
            <ol className='space-y-2 items-center justify-center text-center'>
              <h3 className='text-center text-indigo-500'>X-Ray Study History</h3>
              <div className='flex'>
              { hasImage && <NextImage 
                className='flex'
                src={imageName}
                width='500'
                height='500' //the model output sizes
                alt='x-ray results' 
                key={Date.now()}
                style={{width: '40vw', height: '65vh'}}
              /> }
              </div>
              <div className=''>
              <Button
                onClick={newStudy}
                variant='primary'
                size='base'
              >Start New Study
                </Button>
              </div>
            </ol>
        </div>
      </section>
    </main>
  );  
}


