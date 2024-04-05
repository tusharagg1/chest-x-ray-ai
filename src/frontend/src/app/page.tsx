/*
* Author: Allison Cook
* Date Created: January 2024
* Purpose: Display the login page when first accessing the webpage 
*/
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';

import { signInAUser } from '../../../backend/database/backend';

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
    setLoading(true);
    const signInTxt = document.getElementById('signInSuccess');

    //password validation
    if (password == '') {
      setPasswordError(true);
      setPasswordErrorMessage('Please enter your password');
      return;
    } else if (password.length < 4) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 8 characters');
      return;
    } else {
      setPasswordError(false);
    }

    //email validation
    if (email == '') {
      setEmailError(true);
      setEmailErrorMessage('Please enter your email');
      return;
    } else {
      setEmailError(false);
    }

    signInAUser(email, password)
      .then((userData) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        signInTxt!.innerHTML = `Sign In Successful! Welcome ${userData.userName}!`;
        window.location.href = '/Main';
      })
      .catch(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        signInTxt!.innerHTML = 'Sign In Failed! Error in User Sign In!';
      });
  }

  return (
    <main
      className='min-h-screen bg-indigo-100'
      style={{
        backgroundImage:
          'linear-gradient(to bottom right, rgb(224, 231, 255), rgb(165, 180, 252))',
      }}
    >
      <section>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center gap-5 py-2 text-center'>
          <h1 className='text-indigo-500'>X-Ray Assist</h1>
          <div className='bg-gray-500'>
            <Image
              //className='flex'
              src='/images/loginImage.png'
              alt='x-ray results'
              sizes='100vw'
              //fill
              style={{ width: '100%', height: 'auto' }}
              width={500}
              height={500}
            />
          </div>
          <div
            className='gap-2 bg-white py-5'
            style={{ width: '40%', height: '50%', zIndex: 5 }}
          >
            <h2 className='text-indigo-500'>Login</h2>
            <p className='text-gray-500'>Sign in to your account</p>
            <form method='post' className='mt-3'>
              <ol>
                {/* login input form */}
                <div>
                  <label
                    className='text-gray-500 '
                    style={{ textAlign: 'left', paddingRight: '55%' }}
                  >
                    Email
                  </label>
                  <br></br>
                  <input
                    style={{
                      background: 'url("/images/person.png") no-repeat left',
                      paddingLeft: '10%',
                      backgroundColor: 'rgb(229, 231, 235)',
                      width: '65%',
                    }}
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                  />
                </div>
                <div>
                  <label
                    className='text-gray-500'
                    style={{ textAlign: 'left', paddingRight: '50%' }}
                  >
                    Password
                  </label>
                  <br></br>
                  <input
                    style={{
                      background: 'url("/images/lock.png") no-repeat left',
                      paddingLeft: '10%',
                      backgroundColor: 'rgb(229, 231, 235)',
                      width: '65%',
                    }}
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                  />
                </div>
                <div className='flex justify-center py-2 text-center'>
                  <Button
                    size='base'
                    variant='primary'
                    isLoading={loading}
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                </div>
                <div>
                  <label id='signInSuccess'></label>
                </div>
              </ol>
            </form>

            {emailError && <p className='text-red-500'>{emailErrorMessage}</p>}
            {passwordError && (
              <p className='text-red-500'>{passwordErrorMessage}</p>
            )}
          </div>
          <div
            style={{
              paddingLeft: '2%',
              paddingTop: '15%',
              position: 'absolute',
              zIndex: 1,
              width: '42%',
              height: '74%',
            }}
          >
            <br></br>
            <br></br>
            <div
              className='bg-indigo-500 '
              style={{ width: '100%', height: '60%' }}
            ></div>
          </div>
          <div className='text-gray-500' style={{ zIndex: 2 }}>
            <p>
              Don't have an account?
              <br></br>
              <UnderlineLink href='/SignUp' className='text-sm text-gray-500'>
                Create one.
              </UnderlineLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
