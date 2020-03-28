import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

//import './sign-in.styles.jsx';
import { SignInContainer, SignInTitle, ButtonsBarContainer } from './sign-in.styles';

const SignIn = () => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  //destrucure userCredentials object to get the individual values
  //because we will use these two values in the form's input fields
  const { email, password } = userCredentials;

  //methods - setting state is asynchronous but handleSubmit catches the final state of the form
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setCredentials({ email: '', password: '' }); //clear the form
    } catch (error) {
      console.log(error);
    }

    //console.log(userCredentials);
  };

  const handleChange = e => {
    //We deconstruct the event target object
    const { value, name } = e.target;

    //if name is password then we get the object { password: value }
    //console.log(userCredentials);
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput name='email' type='email' value={email} label='email' required handleChange={handleChange} />
        <FormInput
          name='password'
          type='password'
          value={password}
          label='password'
          required
          handleChange={handleChange}
        />
        <ButtonsBarContainer>
          {/* type and onClick are passed down to a classic button in custom-button.component.jsx as ...otherProps since they are normal button tag properties */}
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
