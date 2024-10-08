import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/dashboard';
import useF1Data from '../hooks/useF1Data';

jest.mock('../hooks/useF1Data');

describe('Dashboard', () => {
  it('renders dashboard content when data is loaded', () => {
    const mockData = {
      loading: false,
      error: null,
      races: [{ 
        round: '1', 
        raceName: 'Test Race', 
        date: '2023-07-09', 
        time: '14:00:00Z', 
        Circuit: { 
          Location: { country: 'Italy' }, // Changed from 'TestCountry' to 'Italy'
          circuitName: 'Test Circuit' 
        } 
      }],
      driverStandings: [{ position: '1', Driver: { givenName: 'Test', familyName: 'Driver', driverId: 'test1' }, Constructors: [{ name: 'Test Constructor' }], points: '25' }],
      constructorStandings: [{ position: '1', Constructor: { name: 'Test Team', constructorId: 'test1' }, points: '25' }],
      nextRace: { raceName: 'Next Race', Circuit: { circuitName: 'Test Circuit' } },
    };

    useF1Data.mockReturnValue(mockData);

    render(<Dashboard />);
    
    // Check for main elements
    expect(screen.getByText('F1 Dashboard')).toBeInTheDocument();
    expect(screen.getByText(/Next Race/)).toBeInTheDocument();
    
    // Check for race data
    expect(screen.getByText('Test Race')).toBeInTheDocument();
    
    // Check for driver standings
    expect(screen.getByText('Test Driver')).toBeInTheDocument();
    expect(screen.getByText('Test Constructor')).toBeInTheDocument();
    
    // Check for constructor standings
    expect(screen.getByText('Test Team')).toBeInTheDocument();
    
    // Check for points (using getAllByText instead of getByText)
    const pointsElements = screen.getAllByText('25 PTS');
    expect(pointsElements).toHaveLength(2); // Expecting two elements with '25 PTS'
    
    // Check for upcoming races section
    expect(screen.getByText('Upcoming Races')).toBeInTheDocument();
  });
});
