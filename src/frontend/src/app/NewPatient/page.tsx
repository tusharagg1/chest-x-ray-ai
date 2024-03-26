'use client';
import { useState } from 'react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';

import cols from '@/app/components/patientRows';
import Table from '@/app/components/tableSingle';
import { createANewPatient } from '../../../../backend/database/backend';

export default function PatientRecord() {
  // const [notes, setNotes] = useState('\n Image observations, other notes');
  // const [imageName, setImageName] = useState('/images/case1_008.jpg');
  // const [hasImage, setHasImage] = useState(true);
  // const [date, setDate] = useState('2023-11-03');
  const [missingInfo, setMissingInfo] = useState('none');

  const data = () => {
    const info = [];
    info.push({
      Title: "Patient ID",
      Value: "-",
    });
    info.push({
      Title: "MRN",
      Value: "-",
    });
    info.push({
      Title: "Name",
      Value: "-",
    });
    info.push({
      Title: "Email",
      Value: "-"
    });
    info.push({
      Title: "D.O.B",
      Value: '-',
    });
    info.push({
      Title: "Gender",
      Value: "-",
    });
    info.push({
      Title: "Phone Number",
      Value: "-"
    })
    info.push({
      Title: "Referring Physician",
      Value: "-",
    });
    info.push({
      Title: "Last Visit",
      Value: '-'
    });
    info.push({
      Title: "Notes",
      Value: ''
    });
    return info;
  }

  function upload() {
    // get any other previous data
    // and write patient data to the database
    const patientId = getFieldValue('patientId');
    const mrn = getFieldValue('mrn');
    const firstName = getFieldValue('firstName');
    const lastName = getFieldValue('lastName');
    const email = getFieldValue('email');
    const dob = getFieldValue('dob');
    const gender = getFieldValue('gender');
    const phone = getFieldValue('phone');
    const refPhys = getFieldValue('refPhys');
    const lastVisit = getFieldValue('lastVisit');
    const notes = getFieldValue('notes');

    const uploadSuccess = document.getElementById('uploadSuccess');

    createANewPatient(patientId, mrn, firstName, lastName, email, dob, gender, phone, refPhys, lastVisit, notes)
      .then((_patientId) => {
        console.log('Patient Record Created!');
        uploadSuccess!.innerHTML = 'Patient Data Upload Successful!';
      })
      .catch((error) => {
        console.log('Patient Record Creation Failed!');
        console.log(error);
        uploadSuccess!.innerHTML = 'Patient Data Upload Failed!';
      });
  }

  function verify() {
    // check all needed info is there
    const missingInfos = document.getElementById('missingFields');

    const fields = ['patientId', 'mrn', 'firstName', 'lastName', 'email', 'dob', 'gender', 'phone', 'refPhys', 'lastVisit'];
    var missingFields = '';
    for (var field of fields) {
      if (getFieldValue(field) === '') {
        missingFields += missingFields ? ", " + field : field;
      }
    }
    missingInfos!.innerHTML = missingFields;
  }

  // try to get value from field in the form
  function getFieldValue(fieldName: string) {
    const field = (document.getElementById(fieldName) as HTMLInputElement);
    return field ? field.value : null;
  }

  const onDataEntry = () => {
    // get all the data from the form
    // and prepare it for sending to the backend
    const patientId = getFieldValue('patientId');
    const mrn = getFieldValue('mrn');
    const firstName = getFieldValue('firstName');
    const lastName = getFieldValue('lastName');
    const email = getFieldValue('email');
    const dob = getFieldValue('dob');
    const gender = getFieldValue('gender');
    const phone = getFieldValue('phone');
    const refPhys = getFieldValue('refPhys');
    const lastVisit = getFieldValue('lastVisit');
    const notes = getFieldValue('notes');

    const dataTable = document.getElementById('dataTable');

    const info = [];
    info.push({
      Title: "Patient ID",
      Value: patientId ? patientId : "-"
    });
    info.push({
      Title: "MRN",
      Value: mrn ? mrn : "-"
    });
    info.push({
      Title: "Name",
      Value: firstName && lastName ? firstName + " " + lastName : "-"
    });
    info.push({
      Title: "Email",
      Value: email ? email : "-"
    });
    info.push({
      Title: "D.O.B",
      Value: dob ? dob : '-'
    });
    info.push({
      Title: "Gender",
      Value: gender ? gender : "-"
    });
    info.push({
      Title: "Phone Number",
      Value: phone ? phone : "-"
    })
    info.push({
      Title: "Referring Physician",
      Value: refPhys ? refPhys : "-"
    });
    info.push({
      Title: "Last Visit",
      Value: lastVisit ? lastVisit : '-'
    });
    info.push({
      Title: "Notes",
      Value: notes ? notes : "-"
    });
    dataTable!.innerHTML = ReactDOMServer.renderToString(<Table data={info} columns={cols} />);
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
            <div style={{width: '45%', height: '100vh', zIndex: '5'}} className='text-indigo-500 bg-white'>
                <h3 className='text-center'>Patient Record</h3>
                <div id='dataTable'><Table data={(data())} columns={cols} /></div>
                
                <form>
                    <input type='file' accept='.dcm' placeholder='Choose File...' />
                    <Button
                     onClick={upload}
                     variant='primary'
                     size='sm'>Upload
                    </Button>
                    <br></br>
                    <p id="uploadSuccess"></p>
                </form>
            </div>
            <div style={{paddingLeft: '1%', paddingTop: '1%', position: 'absolute', zIndex: '3', "width" : "40%", "height" : "82%"}}>
              <div className='bg-indigo-500 ' style={{"width" : "100%", "height" : "100%"}}></div>
            </div> 
            <div style={{width: '40%', height: '30vh', zIndex: '5', position: 'absolute', right: 0, paddingRight: '4%'}} className='text-indigo-500 flex gap-2'>
              <div className='bg-white' style={{width: '100%', height: '100%'}} >
              <ol className='space-y-3'>
                <h3 className='text-center'>Missing Information</h3>
                <p className='' id='missingFields' style={{fontWeight: 'bold', paddingLeft: '3%'}}>{missingInfo}</p>
                <div className='text-center justify-center py-5 '>
                    <Button
                    onClick={verify}
                    variant='primary'
                    size='base'
                    >Verify
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

      <section className='py-2 bg-indigo-100'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <h3 className='text-indigo-500'>Patient Record Entry Form:</h3>
          <br></br>
          <form className='bg-indigo-100'>
            <p>Patient ID:</p>
            <input type='text' id='patientId' placeholder='Patient ID' />
            <p>MRN:</p>
            <input type='text' id="mrn" placeholder='MRN' />
            <p>First Name:</p>
            <input type='text' id='firstName' placeholder='Patient First Name' />
            <p>Last Name:</p>
            <input type='text' id='lastName' placeholder='Patient Last Name' />
            <p>Email:</p>
            <input type='text' id='email' placeholder='Patient Email' />
            <p>Date of Birth:</p>
            <input type='date' id='dob' />
            <p>Gender:</p>
            <input type='text' id='gender' placeholder='Patient Gender' />
            <p>Phone Number:</p>
            <input type='tel' id='phone' placeholder='555-555-5555' />
            <p>Referring Physician:</p>
            <input type='text' id='refPhys' placeholder="Referring Physician's Full Name" />
            <p>Last Visit:</p>
            <input type='date' id='lastVisit' />
            <p>Notes:</p>
            <textarea id='notes' placeholder='Image observations, other notes' />
          </form>
          <br></br>
          <Button id='submitBtn' onClick={onDataEntry} variant='primary'>Submit</Button>
        </div>
      </section>
    </main>
  );
}
