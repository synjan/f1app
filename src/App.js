import React, { useState } from 'react';
import F1Season2024 from './F1Season2024';

function App() {
  const [f1Fact, setF1Fact] = useState('');
  const [showFact, setShowFact] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced randomization function to select themes, fact types, and additional keywords
  const getRandomElements = () => {
    const themes = ["technological innovations", "historical milestones", "unforgettable moments", "pioneering strategies", "engineering marvels"];
    const factTypes = ["intriguing records", "groundbreaking technologies", "iconic races", "legendary drivers", "pivotal moments"];
    const keywords = ["aerodynamics", "safety advancements", "fuel efficiency", "circuit designs", "team dynamics"];

    // Randomly select one element from each array
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const factType = factTypes[Math.floor(Math.random() * factTypes.length)];
    const keyword = keywords[Math.floor(Math.random() * keywords.length)];

    return { theme, factType, keyword };
  };

  const fetchF1Fact = async () => {
    setIsLoading(true);
    const { theme, factType, keyword } = getRandomElements(); // Get random elements for the prompt
    
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
              content: `Generate a concise, engaging fact about Formula 1 focusing on ${theme}, particularly on ${factType} related to ${keyword}. The fact should be accessible to both new fans and enthusiasts, avoiding overly technical jargon unless necessary for clarity.`
            },
            {
              role: "user",
              content: "Provide a unique F1 fact. Be short and to the point."
            }
          ],
          temperature: 0.7,
          max_tokens: 60, // Reduced for conciseness
          top_p: 1.0,
          frequency_penalty: 0.5, // Adjusted to reduce repetition
          presence_penalty: 0.5 // Adjusted to encourage mentioning new concepts
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
