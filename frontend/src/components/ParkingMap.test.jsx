import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import ParkingMap from './ParkingMap';

describe('ParkingMap Congestion Routing Logic', () => {
  it('should route to Gate A when Gate A is less congested than Gate B', () => {
    const mockData = {
      'gate-a': { density: 0.2 },
      'gate-b': { density: 0.8 }
    };
    render(<ParkingMap crowdData={mockData} />);
    
    // The component should detect Gate A as the best gate
    const routingText = screen.getByText(/Currently routing to Gate A/i);
    expect(routingText).not.toBeNull();
  });

  it('should route to Gate B when Gate B is less congested than Gate A', () => {
    const mockData = {
      'gate-a': { density: 0.9 },
      'gate-b': { density: 0.4 }
    };
    render(<ParkingMap crowdData={mockData} />);
    
    // The component should dynamically shift to Gate B
    const routingText = screen.getByText(/Currently routing to Gate B/i);
    expect(routingText).not.toBeNull();
  });
});
