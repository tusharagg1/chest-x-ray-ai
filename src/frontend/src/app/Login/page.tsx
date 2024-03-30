'use client';
import Button from '@/components/buttons/Button';
import { signInAUser } from '../../../../backend/database/backend';
import React, { useState } from 'react';

export default function SignInPage() {
  const [emailError, setEmailError] = useState(false);
  var [email, setUsername] = useState('');
  var [password, setPassword] = useState('');

  const onSignIn = () => {
    email = (document.getElementById('userName_email') as HTMLInputElement).value;
    password = (document.getElementById('password') as HTMLInputElement).value;

    const signInBtn = document.getElementById('signInBtn');
    const signInTxt = document.getElementById('signInSuccess');

    function verifyFields() {
      let hasError = false;
      if (email === '' || password === '') {
        setEmailError(true);
        hasError = true;
        console.log('setEmailError:', hasError)
        return false;
      } else {
        setEmailError(false);
        console.log('Username/Email:', email);
        console.log('Password:', password);
        return true;
      }
    }

    if (verifyFields()) {
      signInAUser(email, password)
        .then((userData) => {
          signInTxt!.innerHTML = `Sign In Successful! Welcome ${userData.userName}!`;
          setTimeout(() => {}, 1000);
          window.location.href = '/Main';
        })
        .catch((error) => {
          console.log(error);
          signInTxt!.innerHTML = "Sign In Failed! Error in User Sign In!";
        });
    }
    else {
      signInTxt!.innerHTML = "Sign In Failed! Invalid Username/Email or Password!";
    }
  };

  const goToSignUp = () => {
    window.location.href = '/SignUp';
  };

  return (
    <main className='bg-indigo-100'>
      <section className='py-2'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <h2 className='text-indigo-500'>Login</h2>
          <br></br>

          <form className='bg-indigo-100'>
            <p>Username/Email:</p>
            <input type='text' id='userName_email' placeholder='Username/Email' />
            <p>Password:</p>
            <input type='password' id='password' placeholder='Password' />
          </form>
          <br></br>

          <Button id='signInBtn' onClick={onSignIn} variant='primary'>Login</Button>
          <label id="signInSuccess"></label>
          <br></br>

          <label>Don't have an account? Create one below.</label>
          <br></br>
          <Button id='signUpBtn' onClick={goToSignUp} variant='primary'>Create Account</Button>
        </div>
      </section>
    </main>
  );
}
