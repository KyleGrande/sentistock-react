import React, { useEffect, useState } from 'react';
import SignOutButton from '../SignOutButton';
import AuthBox from '../AuthBox';
import Dashboard from '../dashboard/Dashboard';
import TopStocksContainer from '../TopStocksContainer';
import Header from '../header/Header';
import './Home.css';



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
        <Header/>
        <div className="homeContainer" >
          <div className="homeLeft-component">
          <AuthBox loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </div>
          
          <div className="homeRight-component">
          <TopStocksContainer />
          </div>
        </div>

      </>

    );
  };

  return <div>{renderComponent()}</div>;
}

export default Home;
