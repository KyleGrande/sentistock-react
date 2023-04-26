import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOutButton from './SignOutButton';
import Dashboard from './Dashboard';

function Home({ loggedIn, setLoggedIn, children }) {
  const [localLoggedIn, setLocalLoggedIn] = useState(loggedIn);
  const [topStocks, setTopStocks] = useState([]);

  useEffect(() => {
    setLocalLoggedIn(loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    const fetchTopStocks = async () => {
      try {
        const response = await fetch('https://maudq0r7z3.execute-api.us-east-1.amazonaws.com/prod/gettopstocks');
        const data = await response.json();
        setTopStocks(data);
      } catch (error) {
        console.error('Error fetching top stocks:', error);
      }
    };

    fetchTopStocks();
  }, []);

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
        <div>
          <h3>Top 10 Stocks:</h3>
          <ul>
            {topStocks.map((stock, index) => (
              <li key={index}>
                {stock.ticker} - Price: {stock.quote} - Sentiment: {stock.sentiment} - Avg Sentiment: {stock.avg_sentiment}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  return <div>{renderComponent()}</div>;
}

export default Home;
