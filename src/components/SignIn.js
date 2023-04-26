import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { UserPool } from './cognitoConfig';
import { useNavigate } from 'react-router-dom';

function SignIn({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        setLoggedIn(true); // Update the loggedIn state in App component
      },
      onFailure: (err) => {
        console.error('onFailure:', err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        console.log('newPasswordRequired:', userAttributes, requiredAttributes);
      },
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
