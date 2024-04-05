/*
* Author: Allison Cook
* Date Created: March 2024
* Purpose: Display the account creation page
*/
'use client';
import Image from 'next/image';
import React, { useState } from 'react';

// import internally defined components
import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';

import { createANewUser } from '../../../../backend/database/backend';

// import internally defined backend functions
import { createANewUser } from '../../../../backend/database/backend';

// define the sign up page
export default function SignUpPage() {
  // define email related state variables
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  // define password related state variables
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  // define state variables for user input fields (first name, last name,
  // associated medical institution(s), and admin status)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [medInsts, setMedInsts] = useState(['']);
  const [isAdmin, setIsAdmin] = useState(false);
  // define sign up button loading state variable
  const [loading, setLoading] = useState(false);

  // define functions to handle and verify email input field changes
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    verifyEmail(event.target.value);
    setEmail(event.target.value);
  }

  function verifyEmail(email: string) {
    if (email === '') {
      setEmailError(true);
      setEmailErrorMessage('Please enter your email');
    } else {
      setEmailError(false);
      setEmailErrorMessage('Valid email');
    }
    console.log('setEmailError:', emailErrorMessage);
  }

  // define functions to handle and verify password input field changes
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    verifyPassword(event.target.value);
    setPassword(event.target.value);
  }

  function verifyPassword(password: string) {
    if (password === '') {
      setPasswordError(true);
      setPasswordErrorMessage('Please enter your password');
    } else if (password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 8 characters long');
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('Valid password');
    }
    console.log('setPasswordError:', passwordErrorMessage);
  }

  // define function to handle user sign up attempt
  const onSignUp = () => {
    setEmail((document.getElementById('email') as HTMLInputElement).value);
    setPassword(
      (document.getElementById('password') as HTMLInputElement).value
    );
    const firstName = (document.getElementById('firstName') as HTMLInputElement)
      .value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement)
      .value;
    const userName = firstName + lastName;
    const medInsts = 'MedInsts';
    const isAdmin = false;
    const signUpTxt = document.getElementById('signUpSuccess');

    // verify user email and password field inputs
    function verifyFields() {
      if (email === '') {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      return !emailError;
    }

    if (verifyFields()) {
      createANewUser(
        firstName + lastName,
        email,
        password,
        firstName,
        lastName,
        medInsts,
        isAdmin
      )
        .then((_userId) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          signUpTxt!.innerHTML = 'Sign Up Successful! Welcome!';
          window.location.href = '/Main';
        })
        .catch((_error) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          signUpTxt!.innerHTML = 'Sign Up Failed! Error in User Creation!';
        });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      signUpTxt!.innerHTML =
        'Sign Up Failed! Invalid Username/Email or Password!';
    }
  };

  // render the sign up page
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
          <h2 className='text-indigo-500'>Sign Up</h2>
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
            style={{ width: '35%', height: '50%', zIndex: 5 }}
          >
            {/* input form with elements to create a new user */}
            <form className='mt-3'>
              <label
                className='text-gray-500 '
                style={{ textAlign: 'left', paddingRight: '55%' }}
              >
                Email
              </label>
              <input
                type='email'
                placeholder='Email'
                style={{
                  background: 'url("/images/person.png") no-repeat left',
                  paddingLeft: '10%',
                  backgroundColor: 'rgb(229, 231, 235)',
                  width: '65%'
                }}
                value={email}
                required
                onChange={handleEmailChange}
              />
              <label
                className='text-gray-500 '
                style={{ textAlign: 'left', paddingRight: '47%' }}
              >
                Password
              </label>
              <input
                type='password'
                placeholder='Password'
                style={{
                  background: 'url("/images/lock.png") no-repeat left',
                  paddingLeft: '10%',
                  backgroundColor: 'rgb(229, 231, 235)',
                  width: '65%'
                }}
                value={password}
                required
                onChange={handlePasswordChange}
              />
              <br></br>
              <label
                className='text-gray-500 '
                style={{ textAlign: 'left', paddingRight: '45%' }}
              >
                First Name
              </label>
              <input
                type='text'
                placeholder='First Name'
                style={{
                  background: 'url("/images/person.png") no-repeat left',
                  paddingLeft: '10%',
                  backgroundColor: 'rgb(229, 231, 235)',
                  width: '65%'
                }}
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br></br>
              <label
                className='text-gray-500 '
                style={{ textAlign: 'left', paddingRight: '45%' }}
              >
                Last Name
              </label>
              <input
                type='text'
                placeholder='Last Name'
                style={{
                  background: 'url("/images/person.png") no-repeat left',
                  paddingLeft: '10%',
                  backgroundColor: 'rgb(229, 231, 235)',
                  width: '65%',
                }}
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </form>
            <br></br>
            <Button id='signUpBtn' onClick={onSignUp} variant='primary'>
              Create Account
            </Button>
          </div>
          <div>
            {emailError && <p className='text-red-500'>{emailErrorMessage}</p>}
            {passwordError && (
              <p className='text-red-500'>{passwordErrorMessage}</p>
            )}
            <label id='signUpSuccess'></label>
            <br></br>
          </div>
          <div
            style={{
              paddingLeft: '2%',
              paddingTop: '14%',
              position: 'absolute',
              zIndex: 1,
              width: '37%',
              height: '82%',
            }}
          >
            <br></br>
            <br></br>
            <br></br>
            <div
              className='bg-indigo-500 '
              style={{ width: '100%', height: '60%' }}
            ></div>
          </div>
          <p className='text-gray-500' style={{ zIndex: 2 }}>
            Already have an account?
            <br></br>
            <UnderlineLink href='/' className='text-sm text-gray-500'>
              Click here to sign in.
            </UnderlineLink>
          </p>
        </div>
      </section>
    </main>
  );
}
