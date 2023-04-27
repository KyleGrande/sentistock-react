import React, {useState, useEffect} from 'react';
import withAuth from './withAuth';
import SignOutButton from './SignOutButton';
import { UserPool } from './cognitoConfig';
import UserStocksContainer from './UserStocksContainer';
import StockSearch from './StockSearch';
import { getCognitoUserId, getUserGivenName } from './getCognitoUserId';


function Dashboard() {
  const [userStocks, setUserStocks] = useState([]);
  const userCognitoId = getCognitoUserId();
  // const [userGivenName, setUserGivenName] = useState(null);

  // useEffect(() => {
  //   const fetchUserGivenName = async () => {
  //     const name = await getUserGivenName();
  //     setUserGivenName(name);
  //   };

  //   fetchUserGivenName();
  // }, []);
  
  const [userGivenName, setUserGivenName] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem('given_name');
    if (name) {
      setUserGivenName(name);
    }
  }, []);

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
  };
  const handleSignOut = () => {
    const user = UserPool.getCurrentUser();
  
    if (user) {
      user.signOut();
      localStorage.removeItem('user');
      localStorage.removeItem('given_name'); // Remove the given_name from local storage
    }
  };

  return (
    <div>
      <h1>Hello, {userGivenName}</h1>
      <SignOutButton onSignOut={handleSignOut} />
      <UserStocksContainer userStocks={userStocks} setUserStocks={setUserStocks} />
      <StockSearch handleAddStock={handleAddStock} />
    </div>
  );
}

export default withAuth(Dashboard);
