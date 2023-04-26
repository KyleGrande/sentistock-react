import React from 'react';

const UserStocks = ({ userStocks }) => (
  <div>
    <h3>Your Stocks:</h3>
    <ul>
      {userStocks.map((stock, index) => (
        <li key={index}>
          {stock.ticker} - Price: {stock.quote} - Sentiment: {stock.sentiment} - Avg Sentiment: {stock.avg_sentiment}
        </li>
      ))}
    </ul>
  </div>
);

export default UserStocks;
