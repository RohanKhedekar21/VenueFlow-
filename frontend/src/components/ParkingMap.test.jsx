import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import ParkingMap from './ParkingMap';

vi.mock('@react-google-maps/api', () => ({
  useJsApiLoader: () => ({ isLoaded: true }),
  GoogleMap: ({ children }) => <div>{children}</div>,
  DirectionsService: () => null,
  DirectionsRenderer: () => null
}));

describe('ParkingMap Congestion Routing Logic', () => {
  it('should route to Gate A when Gate A is less congested than Gate B', () => {
    const mockData = {
      'gate-a': { density: 0.2 },
      'gate-b': { density: 0.8 }
    };
    render(<ParkingMap crowdData={mockData} apiKey="dummy" />);
    
    // The component should detect Gate A as the best gate
    const gateText = screen.getByText('Gate A');
    expect(gateText).not.toBeNull();
  });

  it('should route to Gate B when Gate B is less congested than Gate A', () => {
    const mockData = {
      'gate-a': { density: 0.9 },
      'gate-b': { density: 0.4 }
    };
    render(<ParkingMap crowdData={mockData} apiKey="dummy" />);
    
    // The component should dynamically shift to Gate B
    const gateText = screen.getByText('Gate B');
    expect(gateText).not.toBeNull();
  });
});
