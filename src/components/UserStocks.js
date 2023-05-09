import React, { useState } from 'react';
import './UserStocks.css';

const UserStocks = ({ userStocks, fetchSingleStockData, updateStockData }) => {
  const [expandedIndices, setExpandedIndices] = useState([]);

  const handleClick = async (index, stock) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((item) => item !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
      const stockData = await fetchSingleStockData(stock.ticker);
      if (stockData) {
        updateStockData(index, {
          quote: stockData.quote,
          sentiment: stockData.sentiment,
          avg_sentiment: stockData.avg_sentiment,
        });
      }
    }
  };

  return (
    <div className='User-Stocks'>
      <h3>Your Stocks:</h3>
      <div className='User-Stocks-Sub-Container'>
        {userStocks.map((stock, index) => (
          <div key={index} className={`stock-item ${expandedIndices.includes(index) ? 'expanded' : ''}`} onClick={() => handleClick(index, stock)}>
            <div className={`ticker ${expandedIndices.includes(index) ? 'expanded' : ''}`}>
              {stock.ticker}
            </div>
            {expandedIndices.includes(index) && stock.quote && (
              // <div>
              //   Price: {stock.quote} - Sentiment: {stock.sentiment} - Avg Sentiment: {stock.avg_sentiment}
              // </div>
              <div className="popup">
              <p>Price: {stock.quote}</p>
              <p>Sentiment: {stock.sentiment}</p>
              <p>Avg Sentiment: {stock.avg_sentiment}</p>
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStocks;
