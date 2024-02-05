'use client';
import Button from '@/components/buttons/Button';
import { createANewUser } from '../../../../backend/database/backend';
import React, { useState } from 'react';

export default function SignUpPage() {
  const [emailError, setEmailError] = useState(false);
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  const onSignUp = () => {
    const userName = (document.getElementById('userName') as HTMLInputElement).value;
    email = (document.getElementById('email') as HTMLInputElement).value;
    password = (document.getElementById('password') as HTMLInputElement).value;
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const medInsts = (document.getElementById('medInsts') as HTMLInputElement).value;
    const isAdmin = (document.getElementById('isAdmin') as HTMLInputElement).value == 'on' ? true : false;

    const signUpBtn = document.getElementById('signUpBtn');
    const signUpTxt = document.getElementById('signUpSuccess');

    function verifyFields() {
      let hasError = false;
      if (email === '') {
        setEmailError(true);
        hasError = true;
        console.log('setEmailError:', hasError)
        console.log(emailError);
        return false;
      } else {
        setEmailError(false);
        console.log('Username/Email:', email);
        console.log('Password:', password);
        return true;
      }
    }

    if (verifyFields()) {
      createANewUser(userName, email, password, firstName, lastName, medInsts, isAdmin)
        .then((_userId) => {
          signUpTxt!.innerHTML = "Sign Up Successful! Welcome!";
          setTimeout(() => {}, 1000);
          window.location.href = '/Main';
        })
        .catch((_error) => {
          signUpTxt!.innerHTML = "Sign Up Failed! Error in User Creation!";
        });
    }
    else {
      signUpTxt!.innerHTML = "Sign Up Failed! Invalid Username/Email or Password!";
    }
  };

  const goToSignIn = () => {
    window.location.href = '/Login';
  };

  return (
    <main className='bg-indigo-100'>
      <section className='py-2'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <h2 className='text-indigo-500'>Sign Up</h2>
          <br></br>

          <form className='bg-indigo-100'>
            <p>Username:</p>
            <input type='text' id='userName' placeholder='Username' />
            <p>Email:</p>
            <input type='text' id='email' placeholder='Email' />
            <p>Password:</p>
            <input type='password' id='password' placeholder='Password' />
            <p>First Name:</p>
            <input type='text' id='firstName' placeholder='First Name' />
            <p>Last Name:</p>
            <input type='text' id='lastName' placeholder='Last Name' />
            <p>Medical Institutions:</p>
            <input type='text' id='medInsts' placeholder='Medical Institutions' />
            <p>Is Admin User:</p>
            <input type='checkbox' id='isAdmin' />
          </form>
          <br></br>

          <Button id='signUpBtn' onClick={onSignUp} variant='primary'>Create Account</Button>
          <label id="signUpSuccess"></label>
          <br></br>

          <label id="existingUser">Have an account? Sign in below.</label>
          <br></br>
          <Button id='signinBtn' onClick={goToSignIn} variant='primary'>Login</Button>
        </div>
      </section>
    </main>
  );
}
