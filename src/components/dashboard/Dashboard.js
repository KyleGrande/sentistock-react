import React, { useState, useEffect } from 'react';
import withAuth from '../withAuth';
import SignOutButton from '../SignOutButton';
import { UserPool } from '../cognitoConfig';
import UserStocksContainer from '../UserStocksContainer';
// import StockSearch2 from './StockSearch2';
import StockSearch from '../StockSearch';
import { getCognitoUserId, getUserGivenName } from '../getCognitoUserId';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SentimentAnalysis from './SentimentAnalysis';

import './Dashboard.css';

function Dashboard() {
  const [userStocks, setUserStocks] = useState([]);
  const userCognitoId = getCognitoUserId();
  const userGivenName = localStorage.getItem('given_name');
  const navigate = useNavigate();

  const handleAddStock = async (stockInfo) => {
    const response = await fetch('https://maudq0r7z3.execute-api.us-east-1.amazonaws.com/prod/adduserstock', {
      method: 'POST',
      body: JSON.stringify({
        ticker: stockInfo.ticker,
        userId: userCognitoId,
      })
    });
    const data = await response.json();
    setUserStocks([...userStocks, stockInfo]);

    // Navigate to the stock page
    // navigate(`/stockinfo/${stockInfo.ticker}`);
  };

  const handleSignOut = () => {
    const user = UserPool.getCurrentUser();

    if (user) {
      user.signOut();
      localStorage.removeItem('user');
      localStorage.removeItem('given_name');
    }
  };

  return (
    <div className='Dashboard'>
      <div className='Dashboard-Header'>
      <h1>Hello, {userGivenName}</h1>
      <Link to="/sentimentanalysis">Sentiment Analysis</Link>
      <SignOutButton onSignOut={handleSignOut} />
      </div>
      <div className='Dashboard-Main-Container'>

      <div className='user-Stocks-Container'>
      <UserStocksContainer userStocks={userStocks} setUserStocks={setUserStocks} />
      {/* <StockSearch2 handleAddStock={handleAddStock} /> */}
      </div>
      <div className='stock-Seach-Container'>
      <StockSearch handleAddStock={handleAddStock} />
      </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
