/*
* Author: Allison Cook
* Date Created: January 2024
* Purpose: Displays search page to allow for a database search with results 
*/
'use client';

import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';

import { cols } from '@/app/components/patientColumns';
import Table from '@/app/components/table';

import { getAllPatientData } from '../../../../backend/database/backend';

export default function SearchPage() {
  const [searchKey, setSearchKey] = useState('');
  const [searchKeyType, setSearchKeyType] = useState('Patient ID');
  const [patientID] = useState('Patient ID');
  const [MRN] = useState('MRN');
  const [Name] = useState('Name');
  const [Ascending] = useState('Ascending');
  const [Descending] = useState('Descending');
  const [lastVist] = useState('Last Vist');
  const [checkBox, setCheckBox] = useState('Patient ID');
  const [orderType, setOrderType] = useState('Ascending');
  const [checkBox2, setCheckBox2] = useState('Ascending');

  useEffect(() => {
    allPatientData();
  }, []);

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
        for (let i= 0; i < 2; i++){
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        patientDataTable!.innerHTML = ReactDOMServer.renderToString(<Table data={items} columns={cols} />);
      })
      .catch(() => {
        //error
      });
  }

  function handleSubmit() {
    //update the table with the matching records
    if (orderType == 'Ascending'){
      //normal fetch of records 
    }
  }

  function study() {
    //go to the x-ray study page
    window.location.href = '/X-RayStudy';
  }

  function handleInputChange(value: string) {
    setCheckBox(value);
    setSearchKeyType(value);
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

  function handleOrderInputChange(value: string) {
    setCheckBox2(value);
    setOrderType(value);
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
      Selected: false,
    });
    for (let i = 1; i < 7; i++) {
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
      <header className='mb-2'>
        <UnderlineLink href='/Main' className='px-8 text-indigo-500'>
          Main
        </UnderlineLink>
        <h1 className='text-m justify-center text-center text-indigo-500'>
          Patients List and Information
        </h1>
      </header>
      <div className='layout relative flex flex-col items-center gap-5 py-2 text-center'>
        <div
          className='gap-2 bg-gray-100 p-5 px-5'
          style={{ width: '95%', height: '80vh', zIndex: 5 }}
        >
          {/* Ability to change sorting and search feild of the database records to be displayed*/}
          <form
            method='post'
            onSubmit={handleSubmit}
            className='items-left my-3 flex ps-1 text-center'
          >
            <ol className='space-y-1'>
              <div className='flex'>
                <h3 className='mb-5 text-indigo-500'>Search: </h3>
                <input
                  className='ms-2'
                  style={{
                    background: 'url("/images/person.png") no-repeat left',
                    paddingLeft: '5%',
                    backgroundColor: 'rgb(217, 217, 217)',
                    width: '25%',
                    height: '6%',
                  }}
                  type='text'
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder={searchKeyType}
                />
              </div>
              <div className='flex'>
                <h3 className='text-indigo-500'>Filter: </h3>
                <div className='ms-2 flex items-center bg-white px-2'>
                  <input
                    type='radio'
                    name='type'
                    checked={patientID == checkBox}
                    onChange={() => handleInputChange(patientID)}
                    style={{
                      border: 'solid #6366F1',
                      backgroundColor:
                        patientID == checkBox ? '#6366F1' : 'white',
                    }}
                  ></input>
                  <label className='px-2'>Patient ID </label>
                  <input
                    type='radio'
                    name='type'
                    checked={MRN == checkBox}
                    onChange={() => handleInputChange(MRN)}
                    style={{
                      border: 'solid #6366F1',
                      backgroundColor: MRN == checkBox ? '#6366F1' : 'white',
                    }}
                  ></input>
                  <label className='px-2'>MRN</label>
                  <input
                    type='radio'
                    name='type'
                    checked={Name == checkBox}
                    onChange={() => handleInputChange(Name)}
                    style={{
                      border: 'solid #6366F1',
                      backgroundColor: Name == checkBox ? '#6366F1' : 'white',
                    }}
                  ></input>
                  <label className='px-2'>Name</label>
                  <input
                    type='radio'
                    name='type'
                    checked={lastVist == checkBox}
                    onChange={() => handleInputChange(lastVist)}
                    style={{
                      border: 'solid #6366F1',
                      backgroundColor:
                        lastVist == checkBox ? '#6366F1' : 'white',
                    }}
                  ></input>
                  <label className='px-2'>Last Visit</label>
                </div>
                <h3 className='ps-2 text-indigo-500'>Order: </h3>
                <div className='ms-2 flex items-center bg-white px-2'>
                  <input
                    type='radio'
                    name='type'
                    checked={Ascending == checkBox2}
                    onChange={() => handleOrderInputChange(Ascending)}
                    style={{
                      border: 'solid #6366F1',
                      backgroundColor:
                        Ascending == checkBox2 ? '#6366F1' : 'white',
                    }}
                  ></input>
                  <label className='px-2'>Ascending </label>
                  <input
                    type='radio'
                    name='type'
                    checked={Descending == checkBox2}
                    onChange={() => handleOrderInputChange(Descending)}
                    style={{
                      border: 'solid #6366F1',
                      backgroundColor:
                        Descending == checkBox2 ? '#6366F1' : 'white',
                    }}
                  ></input>
                  <label className='px-2'>Descending </label>
                </div>
              </div>
            </ol>
          </form>
          {/* display the records according to the search */}
          <div className='flex items-center justify-center text-center' id='patientDataTable'>
            <Table data={data()} columns={cols} />
          </div>
          <div className='mt-3 flex items-center px-2 text-center'>
            <div style={{ paddingRight: '35%' }}>
              <Button
                size='base'
                variant='primary'
                onClick={handleSubmit}
              >
                Search
              </Button>
            </div>
            <Button
              size='base'
              variant='primary'
              onClick={study}
            >
              X-ray Study
            </Button>
          </div>
        </div>
        <div
          style={{
            paddingLeft: '2%',
            paddingTop: '2%',
            position: 'absolute',
            zIndex: 3,
            width: '97%',
            height: '100%',
          }}
        >
          <div
            className='bg-indigo-500 '
            style={{ width: '100%', height: '100%' }}
          ></div>
        </div>
      </div>
    </main>
  );
}
