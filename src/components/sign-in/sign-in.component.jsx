import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  //destrucure userCredentials object to get the individual values
  //because we will use these two values in the form's input fields
  const { email, password } = userCredentials;

  //methods - setting state is asynchronous but handleSubmit catches the final state of the form
  const handleSubmit = e => {
    e.preventDefault();

    //console.log(userCredentials);
    setCredentials({ email: '', password: '' });
  };

  const handleChange = e => {
    //We deconstruct the event target object
    const { value, name } = e.target;

    //if name is password then we get the object { password: value }
    //console.log(userCredentials);
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          value={email}
          label='email'
          required
          handleChange={handleChange}
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          label='password'
          required
          handleChange={handleChange}
        />
        <div className='buttons'>
          {/* type and onClick are passed down to a classic button in custom-button.component.jsx as ...otherProps since they are normal button tag properties */}
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
