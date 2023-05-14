import React from 'react';
import './TopStocks.css';

const getSentimentColor = (sentiment) => {
  if (sentiment <= -0.35) {
    return 'red'; // Bearish
  } else if (sentiment <= -0.15) {
    return 'orange'; // Somewhat Bearish
  } else if (sentiment >= 0.35) {
    return 'green'; // Bullish
  } else if (sentiment >= 0.15) {
    return 'lime'; // Somewhat Bullish
  } else {
    return 'gray'; // Neutral
  }
};

const TopStocks = ({ topStocks }) => (
  <div>
    <h3>Top 10 Stocks:</h3>
    <div className="card-container">
      <div className="card-list">
        <div className="card-header">
          <div className="ticker">Ticker</div>
          <div className="price">Price</div>
          <div className="sentiment">Sentiment</div>
          <div className="average-sentiment">Average Sentiment</div>
        </div>
      </div>

      {topStocks.map((stock, index) => (
        <div
          className="card"
          style={{ border: `3px solid ${getSentimentColor(stock.avg_sentiment)}` }}
          key={index}
        >
          <div className="ticker">{stock.ticker}</div>
          <div className="price">${stock.quote}</div>
          <div className="sentiment">{stock.sentiment}</div>
          <div className="average-sentiment">{stock.avg_sentiment}</div>
        </div>
      ))}
    </div>
  </div>
);

export default TopStocks;
