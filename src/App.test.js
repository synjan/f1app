import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock axios
jest.mock('axios');

test('renders F1 Dashboard', async () => {
  render(<App />);
  
  // Wait for the loading state to finish
  await waitFor(() => {
    expect(screen.getByText('F1 Dashboard')).toBeInTheDocument();
  });
});
