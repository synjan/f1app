import React, { useState } from 'react';
import F1Season2024 from './F1Season2024';

function App() {
  const [f1Fact, setF1Fact] = useState('');
  const [showFact, setShowFact] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Randomization function to select a theme
  const getRandomTheme = () => {
    const themes = ["technological innovations", "historical achievements", "driver profiles", "fascinating comparisons", "team rivalries", ];
    return themes[Math.floor(Math.random() * themes.length)];
  };

  const getRandomFactType = () => {
    const factTypes = [
      "intriguing records",
      "groundbreaking technologies",
      "legendary races",
      "iconic circuits",
      "memorable season finales"
    ];
    return factTypes[Math.floor(Math.random() * factTypes.length)];
  };
  

  const fetchF1Fact = async () => {
    setIsLoading(true);
    const randomTheme = getRandomTheme(); // Get a random theme
    const randomFactType = getRandomFactType(); // Get a random fact type
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `Craft a unique and compelling fact about Formula 1 racing for an app audience, focusing on ${randomTheme} and highlighting ${randomFactType}. Use metric units (meters, kilometers, kilograms, etc.) to align with international standards and enhance accessibility. Ensure the language is engaging and straightforward, suitable for both new fans and seasoned enthusiasts. Each response should provide a complete, standalone fact, avoiding formal introductions and technical jargon unless necessary for clarity. Emphasize creating a diverse range of facts to enrich users' experience, fostering a deeper appreciation of the sport's complexity and allure.`
            },
            {
              role: "user",
              content: "Generate a unique fact about Formula 1 racing, focusing on one aspect"
            }
          ],
          temperature: 1,
          max_tokens: 100,
          top_p: 1.0,
          frequency_penalty: 1.0,
          presence_penalty: 0.0
        }),
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
      setIsLoading(false);
    }
  };
  

  return (
    <div className="App">
      <F1Season2024 />
      <button
        onClick={fetchF1Fact}
        disabled={isLoading}
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
