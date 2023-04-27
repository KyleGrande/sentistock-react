import { useEffect, useCallback } from 'react';
import UserStocks from './UserStocks';
import { getCognitoUserId } from './getCognitoUserId';

function UserStocksContainer({userStocks, setUserStocks}) {
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
        const stocksDataPromises = data.stocks.map((ticker) => fetchSingleStockData(ticker));
        const stocksData = await Promise.all(stocksDataPromises);
        setUserStocks(stocksData.filter((stock) => stock !== null));
      } else {
        console.error('User stocks data is not an array:', data);
        setUserStocks([]); // Set to an empty array in case of an error
      }
    } catch (error) {
      console.error('Error fetching user stocks:', error);
    }
  }, [cognitoUserId, fetchSingleStockData, setUserStocks]);

  useEffect(() => {
    if (cognitoUserId) {
      fetchUserStocks();
    }
  }, [cognitoUserId, fetchUserStocks]);

  return <UserStocks userStocks={userStocks} />;
}

export default UserStocksContainer;
