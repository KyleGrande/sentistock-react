import React, { useState } from 'react';

function StockSearch({ handleAddStock }) {
  const [ticker, setTicker] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [stockInfo, setStockInfo] = useState(null);

  const handleChange = async (event) => {
    setTicker(event.target.value);
    if (event.target.value) {
      try {
        const apiKey = 'JE4GXUURLWA6DGLJ';
        const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${event.target.value}&apikey=${apiKey}`);
        const data = await response.json();
        setSearchResults(data.bestMatches);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectStock = async (symbol) => {
    setTicker(symbol);
    setSearchResults([]);
    handleSearch(symbol);
  };

  const handleSearch = async (symbol) => {
    try {
      const response = await fetch(`https://maudq0r7z3.execute-api.us-east-1.amazonaws.com/prod/getstock?ticker=${symbol}`);
      const data = await response.json();
      setStockInfo(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <div>
      <h3>Search Stocks</h3>
      <div>
        <input
          type="text"
          placeholder="Enter ticker"
          value={ticker}
          onChange={handleChange}
        />
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result, index) => (
              <div key={index} onClick={() => handleSelectStock(result['1. symbol'])}>
                <p>{result['1. symbol']} - {result['2. name']}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <button onClick={() => handleSearch(ticker)}>Search</button>
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
          <></>
        )}
      </div>
    </div>
  );
}

export default StockSearch;
