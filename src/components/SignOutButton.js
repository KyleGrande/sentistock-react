import React from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { UserPool } from './cognitoConfig';

function SignOutButton() {
  const signOut = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      localStorage.removeItem('user');
      localStorage.removeItem('given_name'); // Remove the given_name from local storage
      window.location.href = '/'; // redirect to home page
    }
  };

  

  return <button onClick={signOut}>Sign Out</button>;
}

export default SignOutButton;
