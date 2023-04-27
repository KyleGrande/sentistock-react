// src/components/StockInfo.js
import React from 'react';

function StockInfo({ stock }) {
  return (
    <div>
      {stock ? (
        <>
          <h3>Stock Info:</h3>
          <p>Ticker: {stock.ticker}</p>
          <p>Price: {stock.quote}</p>
          <p>Sentiment: {stock.sentiment}</p>
          <p>Average Sentiment: {stock.avg_sentiment}</p>
          <p>Timestamp: {stock.timestamp}</p>
        </>
      ) : (
        <p>No stock information available.</p>
      )}
    </div>
  );
}

export default StockInfo;
