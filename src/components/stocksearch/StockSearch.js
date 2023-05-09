import React, { useState } from 'react';
import './StockSearch.css';

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

  const closeModal = () => {
    setStockInfo(null);
  };
  const handleSelectStockClose = async (symbol) => {
    setTicker(symbol);
    setSearchResults([]);
    handleSearch(symbol);
  };

  const wrappedHandleAddStock = (stockInfo) => {
    handleAddStock(stockInfo);
    closeModal();
  };
  return (
    <div>
      <h3>Search Stocks</h3>
      <div>
        <input
          className='stockSearchbar'
          type="text"
          placeholder="Enter ticker"
          value={ticker}
          onChange={handleChange}
        />
        <div className="search-results">
        {searchResults.length > 0 && (
          <div >
          {searchResults.map((result, index) => (
            <div key={index}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectStock(result['1. symbol']); }}>
                {result['1. symbol']} - {result['2. name']}
              </a>
            </div>
          ))}
          </div>
        )}
      </div>
      </div>
      <div>
        {/* <button onClick={() => handleSearch(ticker)}>Search</button> */}
      </div>
      <div>
        {stockInfo ? (
          <div className={`modal ${stockInfo ? 'show' : ''}`} onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Stock Info:</h3>
              <p>Ticker: {stockInfo.ticker}</p>
              <p>Price: {stockInfo.quote}</p>
              <p>Sentiment: {stockInfo.sentiment}</p>
              <p>Average Sentiment: {stockInfo.avg_sentiment}</p>
              <p>Timestamp: {stockInfo.timestamp}</p>
              <button onClick={() => wrappedHandleAddStock(stockInfo)}>Add Stock</button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default StockSearch;
