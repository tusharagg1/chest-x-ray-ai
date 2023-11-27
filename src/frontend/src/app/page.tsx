/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useState } from 'react';

import Button from '@/components/buttons/Button';

import {getUserData} from './backend/apis';


export default function loginPage() {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');


    //testing
    //const [test, settestText] = useState('');

    /**
    * @description Validates the email and password, calls the apis
    */
    function handleSubmit() {

        // email validation
        if (email == '') {
            setEmailError(true);
            setEmailErrorMessage('Please enter your email');

        } else {
            setEmailError(false);
        }

        //password validation
        if (password == '') {
            setPasswordError(true);
            setPasswordErrorMessage('Please enter your password');

        } else if (password.length < 8) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 8 characters');

        } else {
            setPasswordError(false);
        }


        //settestText("email: " + email + " Password: " + password);
        
        
        //TO-DO: call login api
        
    }

    return (
        <main className='bg-indigo-100'>
            <section className='py-2'>
                <div className='layout relative flex min-h-screen flex-col py-12 items-center justify-center text-center gap-2'>
                    <h2 className='text-indigo-500'>Login</h2>

                    <form method='post' onSubmit={handleSubmit} className='mt-10'>
                        <ol className='space-y-2'>
                            <div className='bg-white '>
                            <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email'/>
                            </div>
                            <div className='bg-white '>
                            <input type='text' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password'/>
                            </div>

                            <div className='flex text-center justify-center'>
                            <Button
                            size='base'
                            variant='primary'
                            isLoading={loading}
                            type='submit'
                            >
                            Sign In
                            </Button>
                            </div>
                        </ol>
                    </form>

                    {emailError && <p className='text-red-500'>{emailErrorMessage}</p>}
                    {passwordError && <p className='text-red-500'>{passwordErrorMessage}</p>}

                </div>
            </section>
        </main>

    )

}