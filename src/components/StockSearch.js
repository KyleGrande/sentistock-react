import React, { useState } from 'react';

function StockSearch({ handleAddStock }) {
  const [ticker, setTicker] = useState('');
  const [stockInfo, setStockInfo] = useState(null);

  const handleChange = (event) => {
    setTicker(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://maudq0r7z3.execute-api.us-east-1.amazonaws.com/prod/getstock?ticker=${ticker}`);
      const data = await response.json();
      setStockInfo(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter ticker"
          value={ticker}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {stockInfo ? (
          <>
            <h3>Stock Info:</h3>
            <p>Ticker: {stockInfo.ticker}</p>
            <p>Price: {stockInfo.quote}</p>
            <p>Sentiment: {stockInfo.sentiment}</p>
            <p>Average Sentiment: {stockInfo.avg_sentiment}</p>
            <p>Timestamp: {stockInfo.timestamp}</p>
            <button onClick={() => handleAddStock(stockInfo)}>Add Stock</button>
          </>
        ) : (
          <p>Search ANY Stock and GET Sentiment</p>
        )}
      </div>
    </div>
  );
}

export default StockSearch;
