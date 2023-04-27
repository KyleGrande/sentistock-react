import React from 'react';

const UserStocks = ({ userStocks, fetchSingleStockData, updateStockData }) => (
  <div>
    <h3>Your Stocks:</h3>
    <ul>
      {userStocks.map((stock, index) => (
        <li key={index}>
          {stock.ticker}
          <button
            onClick={async () => {
              const stockData = await fetchSingleStockData(stock.ticker);
              if (stockData) {
                updateStockData(index, {
                  quote: stockData.quote,
                  sentiment: stockData.sentiment,
                  avg_sentiment: stockData.avg_sentiment,
                });
              }
            }}
          >
            Load Stock Data
          </button>
          {stock.quote && (
            <div>
              Price: {stock.quote} - Sentiment: {stock.sentiment} - Avg Sentiment: {stock.avg_sentiment}
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
);


export default UserStocks;
