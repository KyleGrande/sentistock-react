import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOutButton from './SignOutButton';
import Dashboard from './Dashboard';
import TopStocksContainer from './TopStocksContainer';

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
        <h1>SentiStock</h1>
        <SignIn setLoggedIn={setLoggedIn} />
        <SignUp />
        <TopStocksContainer />
      </>
    );
  };

  return <div>{renderComponent()}</div>;
}

export default Home;
