import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOutButton from './SignOutButton';
import Dashboard from './Dashboard';

function Home({ loggedIn, setLoggedIn, children }) {
  const [localLoggedIn, setLocalLoggedIn] = useState(loggedIn);

  useEffect(() => {
    setLocalLoggedIn(loggedIn);
  }, [loggedIn]);

  const renderComponent = () => {
    if (localLoggedIn) {
      return (
        <>
          <h1>LOGGED IN HOME</h1>
            <Dashboard />
          <SignOutButton setLoggedIn={setLoggedIn} />
        </>
      );
    }

    return (
      <>
        <h1>Log In HOME</h1>
        <SignIn setLoggedIn={setLoggedIn} />
        <SignUp />
      </>
    );
  };

  return <div>{renderComponent()}</div>;
}

export default Home;
