'use client';

import { useState } from "react";

import Button from "@/components/buttons/Button";

import cols from "@/app/components/patientColumns";
// import { Patient } from "@/app/components/patientColumns";
import Table from "@/app/components/table";

export default function MainPage() { 
    const [username, setUser] = useState('username');

    function search() {
        //search for paitent
    }

    function newUpload() {
        //go to the upload patient data page
    }

    function newXrayStudey() {
        //go to the x-ray study page
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
                <h1 className='py-2 text-m text-indigo-500 ' >Welcome {username}!</h1>
            </header>
            <div className='py-2 layout relative flex min-h-screen flex-col items-center text-center gap-5'>
                    <div className='bg-gray-100 p-5 gap-2 px-5' style={{width: "85%", height : '53vh', zIndex: '5'}}>
                        <h2 className='text-indigo-500 mb-5'>Recent Patients</h2>
                        <div className="flex items-center text-center justify-center">
                            <Table data={data()} columns={cols} />
                        </div>
                    </div>
                    <div style={{paddingLeft: '2%', paddingTop: '2%', position: 'absolute', zIndex: '3', "width" : "87%", "height" : "55%"}}>
                        <div className='bg-indigo-500 ' style={{"width" : "100%", "height" : "100%"}}></div>
                    </div> 
                <Button
                    onClick={search}
                    variant='primary'
                    size='base'
                    className="mt-5"
                    //style={{'width' : '22%', 'textAlign' : 'center'}}
                    //isLoading={loading}
                >
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

    )

}