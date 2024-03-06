import React, { useState } from 'react';
import F1Season2024 from './F1Season2024';

function App() {
  const [f1Fact, setF1Fact] = useState('');
  const [showFact, setShowFact] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Updated loading state

  const fetchF1Fact = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [
            {
              "role": "system",
              "content": "Craft a unique and compelling fact about Formula 1 racing for an app audience, focusing on a single, intriguing aspect per response. Cover a wide array of themes including technological innovations, historical achievements, driver profiles, and fascinating comparisons. Use metric units (meters, kilometers, kilograms, etc.) to align with international standards and enhance accessibility. Ensure the language is engaging and straightforward, suitable for both new fans and seasoned enthusiasts. Each response should provide a complete, standalone fact, avoiding formal introductions and technical jargon unless necessary for clarity. Emphasize creating a diverse range of facts to enrich users' experience, fostering a deeper appreciation of the sport's complexity and allure."
            },
            {
              "role": "user",
              "content": "Generate a unique fact about Formula 1 racing, focusing on one aspect and using metric units for measurements."
            }
          ],
          "temperature": 0.7,
          "max_tokens": 100,
          "top_p": 1.0,
          "frequency_penalty": 0.0,
          "presence_penalty": 0.0
        }
        
        ),
        
        
        
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setF1Fact(data.choices[0].message.content.trim());
      setShowFact(true);
      setShowError(false);
    } catch (error) {
      console.error('Failed to fetch F1 fact:', error);
      setErrorMessage('Failed to fetch F1 fact. Please try again later.');
      setShowError(true);
      setShowFact(false);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="App">
      <F1Season2024 />
      <button
        onClick={fetchF1Fact}
        
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading ? 'Loading...' : 'Get F1 Fact'}
      </button>
      {showFact && (
        <div style={{ position: 'fixed', bottom: '70px', right: '20px', background: 'white', padding: '10px', borderRadius: '5px', zIndex: 1001 }}>
          {f1Fact}
          <button onClick={() => setShowFact(false)} style={{ marginLeft: '10px', cursor: 'pointer' }}>Close</button>
        </div>
      )}
      {showError && (
        <div style={{ position: 'fixed', bottom: '120px', right: '20px', background: 'red', padding: '10px', borderRadius: '5px', color: 'white', zIndex: 1001 }}>
          {errorMessage}
          <button onClick={() => setShowError(false)} style={{ marginLeft: '10px', cursor: 'pointer' }}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
