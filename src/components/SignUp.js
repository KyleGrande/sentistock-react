import React, { useState } from 'react';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { UserPool } from './cognitoConfig';
import { useNavigate } from 'react-router-dom';

function SignUp({switchToSignIn}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [givenName, setGivenName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(
      email,
      password,
      [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
        new CognitoUserAttribute({ Name: 'given_name', Value: givenName }),
      ],
      null,
      (err, data) => {
        if (err) {
          console.error(err);
        } else {
          setShowVerification(true);
          console.log(data);
        }
      }
    );
  };

  const onVerify = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    user.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
        switchToSignIn(); // Call the callback function
      }
    });
  };
  return (
    <div className="form-container" style={{ textAlign: "center" }}>
      {!showVerification ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={givenName}
            onChange={(event) => setGivenName(event.target.value)}
            placeholder="Given Name"
          />
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
          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <form onSubmit={onVerify}>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <input
            type="text"
            value={verificationCode}
            onChange={(event) => setVerificationCode(event.target.value)}
            placeholder="Verification Code"
          />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
}

export default SignUp;
