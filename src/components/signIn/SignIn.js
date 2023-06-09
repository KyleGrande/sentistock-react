import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { UserPool } from '../cognitoConfig';
import { useNavigate } from 'react-router-dom';
import '../Authbox.css';
import './SignIn.css'

function SignIn({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('onSuccess:', data);
        localStorage.setItem('user', JSON.stringify(data));
        user.getUserAttributes((err, attributes) => {
          if (err) {
            console.error('Error fetching user attributes:', err);
          } else {
            const givenNameAttribute = attributes.find(
              (attribute) => attribute.Name === 'given_name'
            );

            if (givenNameAttribute) {
              localStorage.setItem('given_name', givenNameAttribute.Value);
            }
          }
        });

        setLoggedIn(true); // Update the loggedIn state in App component
        navigate('/dashboard'); // Navigate to the Dashboard
      },

      onFailure: (err) => {
        console.error('onFailure:', err);
        setError(err.message);
        
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        console.log('newPasswordRequired:', userAttributes, requiredAttributes);
      },
    });
  };

  return (
<div className="form-container" style={{ textAlign: "left" }}>
      <form onSubmit={onSubmit}>
      <br/>
      <p>Email</p>
        <input 
          className='signInInput'
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
        />
        <p>Password</p>
        <input
          className='signInInput'
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        <br/>
        <button type="submit">Sign In</button>
      </form>
      {error && 
      <p><strong>{error}</strong></p>}
    </div>
  );
}

export default SignIn;
