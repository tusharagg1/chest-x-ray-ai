'use client';
import React, { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';
import NextImage from '@/components/NextImage';

import { Carousel } from '@/app/components/carousel';
import cols from '@/app/components/ItemColumn';
import Loading from '@/app/components/loading';
import SingleTable from '@/app/components/tableSingle';
import Table from '@/app/components/tableSmall';

import { colsInfo } from '../components/patientColumns';

export default function NewStudyPage() {
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [image, setImage] = useState(false);
  const [image_name, setImageName] = useState(' ');
  const [pnRisk, setpnRisk] = useState('0%');
  const [atRisk, setatRisk] = useState('0%');
  const [caRisk, setcaRisk] = useState('0%');
  const [peRisk, setpeRisk] = useState('0%');
  const [processTime, setProccessTime] = useState(0);
  const [notes, setNotes] = useState('\n Image observations, other notes');

  const patientdata = () => {
    const info = [];
    info.push({
      PatientID: 1,
      MRN: 123,
      Name: 'Jack Mean',
      DOB: '2000-10-30',
      Gender: 'M',
      Contact: '111-111-111',
      ReferringP: 'Spencer Smith',
      LastVisit: '2023-11-03',
    });
    return info;
  };

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
    return items;
  };

  const images = [];
  images.push({
    src: '/images/emermed-2016-April-33-4-259-F1 1 (1).png',
    alt: 'image 2',
  });
  images.push({
    src: '/images/case1_008.jpg',
    alt: 'image 2',
  });

  useEffect(() => {
    //final timeout to reveal error message
    // setTimeout(() => setLoadingError(true), 10000)
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading && (
        <div>
          {loadingError && (
            <div
              className='text-gray-500'
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 99999,
              }}
            >
              <p>Error loading results</p>
            </div>
          )}
          <Loading />
        </div>
      )}
      <main
        className='bg-indigo-100'
        style={{
          backgroundImage:
            'linear-gradient(to bottom right, rgb(224, 231, 255), rgb(165, 180, 252))',
          height: '200vh',
        }}
      >
        <header className='mb-2'>
          <UnderlineLink href='/Main' className='px-8 text-indigo-500'>
            Main
          </UnderlineLink>
          <h1 className='text-m justify-center text-center text-indigo-500'>
            New Study
          </h1>
        </header>
        <section>
          <div className='layout relative flex flex-col justify-center gap-5 py-2'>
            <div className='flex items-center text-center'>
              <Table data={patientdata()} columns={colsInfo}></Table>
            </div>
            <div className='flex'>
              <div
                style={{
                  width: '70%',
                  height: '70vh',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                className='text-center'
              >
                <h4 className='text-indigo-500' style={{ paddingRight: '10%' }}>
                  Result Images
                </h4>
                <Carousel data={images} />
                <br></br>
                <h4 className='text-indigo-500' style={{ paddingRight: '10%' }}>
                  Original Images
                </h4>
                <Carousel data={images} />
              </div>
              <div
                className='flex flex-col'
                style={{ height: '100vh', width: '50%' }}
              >
                <div style={{ height: '20%' }}></div>
                <div
                  className='bg-white py-2'
                  style={{ zIndex: 5, height: '100%' }}
                >
                  <h3 className='text-m text-center text-indigo-500'>
                    Pathology Risk
                  </h3>
                  <SingleTable data={data()} columns={cols} />
                  <div className='ps-2'>
                    <p>
                      <b>Processing Time: {processTime} seconds </b>
                    </p>
                    <p className='text-indigo-500'>
                      {' '}
                      <b>Notes: </b>{' '}
                    </p>
                    <p>{notes}</p>
                  </div>
                </div>
                <div
                  style={{
                    paddingLeft: '1%',
                    paddingTop: '10%',
                    position: 'absolute',
                    zIndex: 3,
                    width: '43%',
                    height: '89%',
                  }}
                >
                  <div
                    className='bg-indigo-500'
                    style={{ width: '100%', height: '100%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
