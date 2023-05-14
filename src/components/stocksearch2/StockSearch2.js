import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StockSearch2({ handleAddStock }) {
  const [ticker, setTicker] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setTicker(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=JE4GXUURLWA6DGLJ`);
      const data = await response.json();
      setSearchResults(data.bestMatches || []);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleSelectStock = (symbol) => {
    navigate(`/stockinfo/${symbol}`);
  };
  return (
    <div>
      <div>
        <input
          className="stockSearchbar2"
          type="text"
          placeholder="Enter ticker"
          value={ticker}
          onChange={handleChange}
        />
        <button className="searchButton2" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div>
        {searchResults.map((result) => (
          <div className="searchResultsContainer" key={result["1. symbol"]}>
            {result["1. symbol"]} - {result["2. name"]}
            <div>
              <button
                className="addStockButton2"
                onClick={() => handleAddStock(result)}
              >
                Add Stock
              </button>
              <button
                className="viewStockButton2"
                onClick={() => handleSelectStock(result["1. symbol"])}
              >
                View Stock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default StockSearch2;
