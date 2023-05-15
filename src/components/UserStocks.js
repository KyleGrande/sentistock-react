import React, { useState } from 'react';
import './UserStocks.css';


const UserStocks = ({ userStocks, fetchSingleStockData, updateStockData, handleRemoveStock }) => {
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

  const handleRemoveClick = (event, stock) => {
    event.stopPropagation();  
    handleRemoveStock(stock);
  };

  const getSentimentClass = (sentiment) => {
    if (!sentiment) return '';
    switch (sentiment.toLowerCase()) {
      case 'bullish':
      case 'somewhat bullish':
      case 'extremely bullish':
        return 'positive';
      case 'neutral':
        return 'neutral';
      case 'bearish':
      case 'somewhat bearish':
      case 'extremely bearish':
        return 'negative';
      default:
        return '';
    }
  };
  
  return (
    <div className='User-Stocks'>
      <h3>Your Stocks:</h3>
      <div className='User-Stocks-Sub-Container'>
        {userStocks.map((stock, index) => (
          <div
            key={index}
            className={`stock-item ${expandedIndices.includes(index) ? 'expanded' : ''} ${getSentimentClass(stock.sentiment)}`}
            onClick={() => handleClick(index, stock)}
          >
            <div className={`ticker ${expandedIndices.includes(index) ? 'expanded' : ''}`}>
              {stock.ticker}
            </div>
            {expandedIndices.includes(index) && stock.quote && (
              <div className="popup">
                <p>Price: {stock.quote}</p>
                <p>Sentiment: {stock.sentiment}</p>
                <p>Avg Sentiment: {stock.avg_sentiment}</p>
                <button onClick={(event) => handleRemoveClick(event, stock)}>Remove</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStocks;