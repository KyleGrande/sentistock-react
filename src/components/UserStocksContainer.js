import { useEffect, useCallback } from 'react';
import UserStocks from './UserStocks';
import { getCognitoUserId } from './getCognitoUserId';

function UserStocksContainer({userStocks, setUserStocks, handleRemoveStock}) {
  const cognitoUserId = getCognitoUserId();

  const fetchSingleStockData = useCallback(async (ticker) => {
    try {
      const response = await fetch(`https://maudq0r7z3.execute-api.us-east-1.amazonaws.com/prod/getstock?ticker=${ticker}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stock data for', ticker, error);
      return null;
    }
  }, []);
  
  const fetchUserStocks = useCallback(async () => {
    try {
      const response = await fetch(
        `https://maudq0r7z3.execute-api.us-east-1.amazonaws.com/prod/getuserstocks?userId=${cognitoUserId}`
      );
      const data = await response.json();
      console.log('User stocks data:', data);
      if (data.stocks && Array.isArray(data.stocks)) {
        setUserStocks(data.stocks.map((ticker) => ({ ticker })));
      } else {
        console.error('User stocks data is not an array:', data);
        setUserStocks([]);
      }
    } catch (error) {
      console.error('Error fetching user stocks:', error);
    }
  }, [cognitoUserId, setUserStocks]);
  

  useEffect(() => {
    if (cognitoUserId) {
      fetchUserStocks();
    }
  }, [cognitoUserId, fetchUserStocks]);
  const updateStockData = useCallback(
    (index, stockData) => {
      const updatedStocks = [...userStocks];
      updatedStocks[index] = { ...updatedStocks[index], ...stockData };
      setUserStocks(updatedStocks);
    },
    [userStocks, setUserStocks]
  );

  return (
    <UserStocks
      userStocks={userStocks}
      fetchSingleStockData={fetchSingleStockData}
      updateStockData={updateStockData}
      setUserStocks={setUserStocks} 
      handleRemoveStock={handleRemoveStock} 
    />
  );
}

export default UserStocksContainer;
