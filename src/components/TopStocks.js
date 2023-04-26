import React from 'react';

const TopStocks = ({ topStocks }) => (
  <div>
    <h3>Top 10 Stocks:</h3>
    <ul>
      {(topStocks || []).map((stock, index) => (
        <li key={index}>
          {stock.ticker} - Price: {stock.quote} - Sentiment: {stock.sentiment} - Avg Sentiment: {stock.avg_sentiment}
        </li>
      ))}
    </ul>
  </div>
);

export default TopStocks;
 