'use client';

//import Button from "@/components/buttons/Button";
import React, { useState} from 'react';
import Table from "@/app/Main/table";
import Button from '@/components/buttons/Button';

export default function SearchPage() { 
    const [searchKey, setSearchKey] = useState('');
    const [searchKeyType, setSearchKeyType] = useState('Patient ID');
    const [patientID] = useState('Patient ID');
    const [MRN] = useState('MRN');
    const [Name] = useState('Name');
    const [lastVist] = useState('Last Vist');
    const [checkBox, setCheckBox] = useState('Patient ID');

    type Patient = {
        PatientID : number|null
        MRN: number|null
        Name: string
        DOB: string
        Gender: string
        Contact: string
        ReferringP: string
        LastVisit: string
    }

    type ColumnDefinitionType<T, K extends keyof T> = {
        key: K;
        header: string;
        width?: number|string;
    }
    
    const cols: ColumnDefinitionType<Patient, keyof Patient>[] = [
        {
            key: 'PatientID',
            header: 'Patient ID',
        },
        {
            key: 'MRN',
            header: 'MRN'
        },
        {
            key: 'Name',
            header: 'Name'
        },
        {
            key: 'DOB',
            header: 'D.O.B'
        },
        {
            key: 'Gender',
            header: 'Gender'
        },
        {
            key: 'Contact',
            header: 'Contact'
        }, 
        {
            key: 'ReferringP',
            header: 'Referring Physician',
            width: '15%'

        },
        {
            key: 'LastVisit',
            header: 'Last Visit'
        }
    ]

    function handleSubmit(){
        //go to the detailed page

    }

    function handleInputChange(value: any){
        setCheckBox(value);
        setSearchKeyType(value)
    }

    const data = () => {
        const items = [];
        items.push({
            PatientID: 1,
            MRN: 123,
            Name: "Jack Mean",
            DOB: '2000-10-30',
            Gender: "M",
            Contact: "111-111-111",
            ReferringP: "Spencer Smith",
            LastVisit: '2023-11-03' 
        })
        for (let i = 1; i < 4; i++) {
          items.push({
            PatientID: null,
            MRN: null,
            Name: "-",
            DOB: '-',
            Gender: "-",
            Contact: "-",
            ReferringP: "-",
            LastVisit: '-'
          });
        }
        return items;
    }

    return ( 
        <main className='bg-indigo-100 min-h-screen'>
            <header className='mb-2 justify-center text-center' >
                <h1 className='py-2 text-m text-indigo-500 '>Patients List and Information</h1>
            </header>
            <div className='py-2 layout relative flex min-h-screen flex-col items-center text-center gap-5'>
                    <div className='bg-gray-100 p-5 gap-2 px-5' style={{width: "85%", height : '75vh', zIndex: '5'}}>
                        <h2 className='text-indigo-500 mb-5'>Recent Patients List</h2>
                        <form method='post' onSubmit={handleSubmit} className='my-3 items-left text-center flex ps-1'>
                            <ol className='space-y-2'>
                                <div className='flex'>
                                    <h3 className='text-indigo-500 mb-5'>Search: </h3>
                                    <input className='ms-2' style={{background: 'url("/images/person.png") no-repeat left', paddingLeft: '10%', backgroundColor: 'rgb(217, 217, 217)', width: '35%', height: '6%'}} type='text' value={searchKey} onChange={e => setSearchKey(e.target.value)} placeholder={searchKeyType}/>
                                </div>
                                <div className='flex'>
                                    <h3 className='text-indigo-500'>Filter: </h3>
                                    <div className='flex bg-white items-center px-2 ms-2'>
                                        <input type='radio' name='type' checked={patientID == checkBox} onChange={e => handleInputChange(patientID)} style={{border: 'solid #6366F1', backgroundColor: (patientID == checkBox) ? '#6366F1' : 'white'}}></input><label className='px-2'>Patient ID </label>
                                        <input type='radio' name='type' checked={MRN == checkBox} onChange={e => handleInputChange(MRN)} style={{border: 'solid #6366F1', backgroundColor: (MRN == checkBox) ? '#6366F1' : 'white'}}></input><label className='px-2'>MRN</label>
                                        <input type='radio' name='type' checked={Name == checkBox} onChange={e => handleInputChange(Name)} style={{border: 'solid #6366F1', backgroundColor: (Name == checkBox) ? '#6366F1' : 'white'}}></input><label className='px-2'>Name</label>
                                        <input type='radio' name='type' checked={lastVist == checkBox} onChange={e => handleInputChange(lastVist)} style={{border: 'solid #6366F1', backgroundColor: (lastVist == checkBox) ? '#6366F1' : 'white'}}></input><label className='px-2'>Last Visit</label>
                                    </div>
                                </div>
                            </ol>
                        </form>
                        <div className="flex items-center text-center justify-center">
                            <Table data={(data())} columns={cols} />
                        </div>
                        <div className='flex items-center text-center justify-center mt-3'>
                        <Button
                            size='base'
                            variant='primary'
                            type='submit'
                            //onClick={handleSubmit}
                        >
                        View patient record
                        </Button>
                        </div>
                    </div>
                    <div style={{paddingLeft: '2%', paddingTop: '2%', position: 'absolute', zIndex: '3', "width" : "87%", "height" : "77%"}}>
                        <div className='bg-indigo-500 ' style={{"width" : "100%", "height" : "100%"}}></div>
                    </div> 
            </div>

        </main>

    )

}