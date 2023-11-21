'use client';
import { ColumnDef } from '@tanstack/react-table';
import React, { use, useMemo, useState } from 'react';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';

import { Table } from './table';

type Item = {
  name: string;
  risk: number;
 }

export default function NewStudyPage() {
  const [Button_disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [image_name, setImageName] = useState(' '); 
  const [pnRisk, setpnRisk] = useState(0);
  const [atRisk, setatRisk] = useState(0);
  const [caRisk, setcaRisk] = useState(0);
  const [peRisk, setpeRisk] = useState(0);


  function upload() {
    //get the data after passing data to model
    //setLoading(true);
    setImageName("/images/case1_008.jpg");
    setImage(true);
    //setLoading(false);
  }

  const cols = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        header: 'Name',
        cell: (row) => row.renderValue(),
        accessorKey: 'name',
      },
      {
        header: 'Risk',
        cell: (row) => row.renderValue(),
        accessorKey: 'risk',
      },
    ],
    []
   );

   const data = () => {
    const items = [];
    items.push({
      id: 0,
      name: 'Pneumonia',
      risk: pnRisk,
    });
    items.push({
      id: 1,
      name: 'Atelectasis',
      risk: atRisk,
    });
    items.push({
      id: 2,
      name: 'Cardiomegaly',
      risk: caRisk,
    });
    items.push({
      id: 3,
      name: 'Pleural effusion',
      risk: peRisk,
    });
    for (let i = 4; i < 14; i++) {
      items.push({
        id: i,
        name: '',
        risk: '',
      });
    }
    return items;
   }

  return (
    <main className='bg-indigo-100'>
      <header className='mb-2 justify-center text-center' >
        <h1 className='py-1 text-m text-indigo-500 ' >X-ray Study</h1>
      </header>
      <section className='py-2 bg-indigo-100'>
        <div className='layout flex min-h-screen py-2'>
          <div className='flex'  style={{width:'50%' }}>
          <ol className='space-y-2'>
            <div className= 'flex flex-warp gap-5'>
              <h2 className='text-m md:text-xl text-indigo-500'>Upload DICOM:</h2>
              <div className='flex gap-3'>
              <form className='bg-white'>
                <input type='file' accept='.dcm' placeholder='Choose File...' />
              </form>
              <Button 
                onClick={upload}
                variant='primary'
                size='sm'
                disabled={Button_disabled}
                isLoading={loading}
              >
              Upload
              </Button>
              </div>
            </div>
            <div className='flex'>
              { image &&
              <NextImage 
                className='flex'
                src={image_name}
                width="500"
                height='500' //the model output sizes
                alt='x-ray results' 
                key={Date.now()}
              /> }
            </div>
          </ol>
          </div>
          <div className='flex justify-center' style={{width:'50%'}}>
            <ol className='space-y-'>
              <div className='text-center space-x-2'>
                <h2 className='text-m md:text-xl text-indigo-500'>Pathology Risk</h2>
              </div>
              <div className='flex'>
                <Table data={(data())} columns={(cols)}/>
              </div>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );  
}


