import Button from '@/components/buttons/Button';
import {getUserData} from 'backend/apis'
import React, { useState } from 'react';


export default function loginPage() {
    const [emailError, setEmailError] = useState(false);
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onSignin = () => {
        let hasError = false;
        if (email === '') {
            setEmailError(true);
            hasError = true;
        } else if (!emailRegex.test(email)) {
            setEmailError(true);
            hasError = true;
        } else {
            setEmailError(false);
        }

    }


    return (
        <main className='bg-indigo-100'>
            <section className='py-2'>
                <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
                    <h2 className='text-indigo-500'>Login</h2>
                    <form className='bg-white'>
                        <input type='text' placeholder='Username/Email'/>
                    </form>

                    <form className='bg-white'>
                        <input type='text' placeholder='Username/Email'/>
                    </form>

                    <Button>
                        onClick={onSignin},
                        variant='primary'
                    </Button>
                </div>
            </section>
        </main>

    )

}