import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn'
import './Authbox.css';

function AuthBox({ loggedIn, setLoggedIn }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };
  const switchToSignIn = () => {
    setIsSignUp(false);
  };


  return (
    <div className="sign-in-sign-up-box">
      <h1>SentiStock</h1>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

      {isSignUp ? <SignUp switchToSignIn={switchToSignIn} /> : <SignIn setLoggedIn={setLoggedIn} />}
      <p onClick={toggleAuthMode}>
        {isSignUp ? (
          <p>
            <strong>Already have an account? </strong>
            <span style={{ color: 'blue', fontWeight: 'bold' }}>Sign in</span>
          </p>
        ) : (
          <p>
            <strong>Don't have an account? </strong>
            <span style={{ color: 'blue', fontWeight: 'bold' }}>Sign up</span>
          </p>
        )}
      </p>
    </div>
  );
}

export default AuthBox;
