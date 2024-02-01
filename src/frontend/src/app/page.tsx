frontend/feature/add-login-page
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useState} from 'react';
import { createStyleRegistry,StyleRegistry } from 'styled-jsx';

//import './styles/login.css';
import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';
import NextImage from '@/components/NextImage';
import Image from 'next/image';

//import {getUserData} from './backend/apis';

export default function loginPage() {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
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

        //TO-DO: call login api
        
    }

    return (
        <main className='bg-indigo-100 min-h-screen'>
            <section className='py-2'>
            <div className='layout relative flex min-h-screen flex-col items-center justify-center text-center gap-5'>
                <h1 className='text-indigo-500'>RadiAIdance PACS</h1>
                <div className='bg-gray-500'>
                    <Image
                        //className='flex'
                        src="/images/loginImage.png"
                        alt='x-ray results' 
                        sizes="100vw"
                        //fill
                        style={{width: '100%', height: 'auto'}}
                        width={500}
                        height={500}
                    />
                </div>
                <div className='bg-white py-5 gap-2' style={{"width" : "40%", "height" : "50%", zIndex: '5'}} >
                    <h2 className='text-indigo-500'>Login</h2>
                    <p className='text-gray-500'>Sign in to your account</p>
                    <form method='post' onSubmit={handleSubmit} className='mt-3'>
                        <ol className='space-y-2'>
                            <div>
                                <input style={{background: 'url("/images/person.png") no-repeat left', paddingLeft: '10%', backgroundColor: 'rgb(229, 231, 235)', width: '65%'}} type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email'/>
                            </div>
                            <div>
                                <input style={{background: 'url("/images/lock.png") no-repeat left', paddingLeft: '10%', backgroundColor: 'rgb(229, 231, 235)', width:'65%'}} type='text' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password'/>
                            </div>
                            <div className='flex text-center justify-center'>
                            <Button
                            size='base'
                            variant='primary'
                            isLoading={loading}
                            type='submit'
                            >
                            Login
                            </Button>
                            </div>
                        </ol>
                    </form>
                    <UnderlineLink
                    href='/X-RayStudy'
                    className='text-gray-500 text-sm'
                    >
                    Forgot password
                    </UnderlineLink>

                    {emailError && <p className='text-red-500'>{emailErrorMessage}</p>}
                    {passwordError && <p className='text-red-500'>{passwordErrorMessage}</p>}

                </div>
                <div style={{paddingLeft: '2%', paddingTop: '17%', position: 'absolute', zIndex: '3', "width" : "42%", "height" : "72%"}}>
                    <div className='bg-indigo-500 ' style={{"width" : "100%", "height" : "100%"}}></div>
                </div>
                </div>
            </section>
        </main>
    );

}
