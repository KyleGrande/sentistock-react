import React, { useEffect, useState } from 'react';
import SignOutButton from './SignOutButton';
import AuthBox from './AuthBox';
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
        <AuthBox loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <TopStocksContainer />
      </>
    );
  };

  return <div>{renderComponent()}</div>;
}

export default Home;
