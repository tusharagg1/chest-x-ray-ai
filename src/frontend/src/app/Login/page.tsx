/* 
  Web Page Name: Login
  Author(s): Allison Cook, Nathaniel Hu
  Last Modified Date: 2024-03-30
  Purpose: Allows user to login to app, or navigate to sign up page if user does
           not already have an account.
*/

// desigate this as a client-side web page
'use client';

// import externally defined libraries
import Image from 'next/image';
import React, { useState } from 'react';

// import internally defined components
import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';

// import internally defined backend functions
import { signInAUser } from '../../../../backend/database/backend';

// define the login page
export default function LoginPage() {
  // define email related state variables
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  // define password related state variables
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  // define login success related state variable
  const [loginSuccess, setLoginSuccess] = useState('');
  // define login button loading state variable
  const [loading, setLoading] = useState(false);

  // define functions to handle and verify email input field changes
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    verifyEmail(event);
    setEmail(event.target.value);
  }

  function verifyEmail(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === '') {
      setEmailError(true);
      setEmailErrorMessage('Please enter your email');
    }
    else {
      setEmailError(false);
      setEmailErrorMessage('Valid email');
    }
    console.log('setEmailError:', emailErrorMessage);
  }

  // define functions to handle and verify password input field changes
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    verifyPassword(event);
    setPassword(event.target.value);
  }

  function verifyPassword(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === '') {
      setPasswordError(true);
      setPasswordErrorMessage('Please enter your password');
    }
    else {
      setPasswordError(false);
      setPasswordErrorMessage('Valid password');
    }
    console.log('setPasswordError:', passwordErrorMessage);
  }
  
  // define function to handle user login attempt
  const onLogin = () => {
    // log email and password for login attempt
    console.log('Email:', email);
    console.log('Password:', password);

    if (email !== '' && password !== '') {
      // attempt login with email and password
      signInAUser(email, password)
        .then((userData) => {
          // set loading to true
          setLoading(true);
          // display success message, redirect to main page on successful login
          setLoginSuccess(`Sign In Successful! Welcome ${userData.userName}!`);
          setTimeout(() => {}, 1000);
          window.location.href = '/Main';
        })
        .catch((error) => {
          // log error, display failure message if login attempt fails
          console.log(error);
          setLoginSuccess('Sign In Failed! Error in User Sign In!');
        });
    }
    else {
      // notify user login attempt failed due to invalid email and/or password
      setLoginSuccess('Sign In Failed! Invalid Username/Email or Password!');
    }
  };

  // render the login page
  return (
    <main
      className='min-h-screen bg-indigo-100'
      style={{
        backgroundImage:
          'linear-gradient(to bottom right, rgb(224, 231, 255), rgb(165, 180, 252))'
      }}
    >
      <section>
        <div
          className='layout relative flex min-h-screen flex-col items-center justify-center gap-5 py-12 text-center'
        >
          <h1 className='text-indigo-500'>X-Ray Assist</h1>
          <div className='bg-gray-500'>
            <Image
              // className='flex'
              src='/images/loginImage.png'
              alt='x-ray results'
              sizes='100vw'
              // fill
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
                <div>
                  <label
                    className='text-gray-500'
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
                      width: '65%'
                    }}
                    type='email'
                    placeholder='Email'
                    value={email}
                    required
                    onChange={handleEmailChange}
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
                      width: '65%'
                    }}
                    type='password'
                    placeholder='Password'
                    value={password}
                    required
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className='flex justify-center py-2 text-center'>
                  <Button
                    size='base'
                    variant='primary'
                    isLoading={loading}
                    onClick={onLogin}
                  >
                    Login
                  </Button>
                </div>
                <div>
                  <label id="loginSuccess">{loginSuccess}</label>
                </div>
              </ol>
            </form>
            <UnderlineLink
              href='/RecoverPassword'
              className='text-sm text-gray-500'
            >
              Forgot your password?
              <br></br>
              Click here to recover it.
            </UnderlineLink>
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
              height: '74%'
            }}
          >
            <br></br>
            <br></br>
            <br></br>
            <div
              className='bg-indigo-500'
              style={{ width: '100%', height: '63%' }}
            >
            </div>
          </div>
        <div className='text-gray-500' style={{ zIndex: 2 }}>
          <p>
            Don't have an account?
            <br></br>
            <UnderlineLink href='/SignUp' className='text-sm text-gray-500'>
              Click here to create one.
            </UnderlineLink>
          </p>
        </div>
      </div>
      </section>
    </main>
  );
}
