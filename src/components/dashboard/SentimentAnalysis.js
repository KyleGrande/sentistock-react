import React, { useState } from 'react';
// import './SentimentAnalysis.css';

function SentimentAnalysis() {
  const [inputText, setInputText] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);
  const [targetSentimentResult, setTargetSentimentResult] = useState(null);
  
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAnalyzeSentiment = async () => {
    try {
      const response = await fetch('https://maudq0r7z3.execute-api.us-east-1.amazonaws.com/prod/getsentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      console.log('Analyze Sentiment Response:', data);
      setSentimentResult(data);
    } catch (error) {
      console.error('Analyze Sentiment Error:', error);
    }
  };

  const handleAnalyzeTargetSentiment = async () => {
    try {
      const response = await fetch('https://maudq0r7z3.execute-api.us-east-1.amazonaws.com/prod/gettargetsentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      console.log('Analyze Target Sentiment Response:', data);
      setTargetSentimentResult(data);
    } catch (error) {
      console.error('Analyze Target Sentiment Error:', error);
    }
  };
  
  
  
  

  return (
    <div className="SentimentAnalysis">
      <h1>Sentiment Analysis</h1>
      <textarea value={inputText} onChange={handleChange} />
      <button onClick={handleAnalyzeSentiment}>Analyze Sentiment</button>
      <button onClick={handleAnalyzeTargetSentiment}>Analyze Target Sentiment</button>
      {sentimentResult && (
  <div>
    <h2>Sentiment Result</h2>
    <p>Sentiment: {sentimentResult.Sentiment}</p>
    <h3>Sentiment Scores</h3>
    <ul>
      <li>Mixed: {sentimentResult.SentimentScore.Mixed}</li>
      <li>Negative: {sentimentResult.SentimentScore.Negative}</li>
      <li>Neutral: {sentimentResult.SentimentScore.Neutral}</li>
      <li>Positive: {sentimentResult.SentimentScore.Positive}</li>
    </ul>
  </div>
)}
{targetSentimentResult && (
  <div>
    <h2>Target Sentiment Result</h2>
    {targetSentimentResult.map((item, index) => (
      <div key={index}>
        <p>Text: {item.Text}</p>
        <p>Sentiment: {item.Sentiment}</p>
        <h3>Sentiment Scores</h3>
        <ul>
          <li>Mixed: {item.SentimentScore.Mixed}</li>
          <li>Negative: {item.SentimentScore.Negative}</li>
          <li>Neutral: {item.SentimentScore.Neutral}</li>
          <li>Positive: {item.SentimentScore.Positive}</li>
        </ul>
      </div>
    ))}
  </div>
)}


    </div>
  );  
}

export default SentimentAnalysis;
