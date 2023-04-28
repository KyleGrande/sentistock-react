import React from 'react';
import './TopStocks.css'

const TopStocks = ({ topStocks }) => (
  <div>
    <h3>Top 10 Stocks:</h3>
    {/* <ul> */}
    <div className='card-container'>
    <div class="card-list">
    <div class="card-header">
        <div class="ticker">Ticker</div>
        <div class="price">Price</div>
        <div class="sentiment">Sentiment</div>
        <div class="average-sentiment">Average Sentiment</div>
        </div>
        </div>

      {(topStocks || []).map((stock, index) => (
        // <card key={index}>
        //   <h2>{stock.ticker}</h2>
        //   <p>Price: ${stock.quote}</p>
        //   <p>Sentiment: {stock.sentiment}</p>
        //   <p>Avg Sentiment: {stock.avg_sentiment}</p>
        //   {stock.ticker} - Price: {stock.quote} - Sentiment: {stock.sentiment} - Avg Sentiment: {stock.avg_sentiment}
        // </card>
        
        

        

        <div class="card">
          <div class="ticker">{stock.ticker}</div>
          <div class="price">${stock.quote}</div>
          <div class="sentiment">{stock.sentiment}</div>
          <div class="average-sentiment">{stock.avg_sentiment}</div>
        </div>


      ))}
    {/* </ul> */}
  </div>
  </div>
);

export default TopStocks;
 