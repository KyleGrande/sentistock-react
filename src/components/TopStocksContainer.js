import { useState, useEffect } from 'react';
import TopStocks from './TopStocks';

function TopStocksContainer() {
  const [topStocks, setTopStocks] = useState([]);

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

  return <TopStocks topStocks={topStocks} />;
}

export default TopStocksContainer;
