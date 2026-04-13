import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import AmenitiesList from './AmenitiesList';

const fakeLayout = {
  amenities: [
    { id: 'food-1', name: 'Burger Stand', type: 'food', location: 'concourse-n' }
  ]
};

describe('Amenities Queue UI', () => {
  it('displays accurate wait time calculations next to amenity names', () => {
    render(<AmenitiesList waitTimes={{ 'food-1': { minutes: 12 } }} venueLayout={fakeLayout} />);
    expect(screen.getByText(/Burger Stand/i)).toBeDefined();
    expect(screen.getByText(/12 min/i)).toBeDefined();
  });
  
  it('handles empty loading state robustly', () => {
    render(<AmenitiesList waitTimes={{}} venueLayout={null} />);
    expect(screen.getByText(/Loading layout/i)).toBeDefined();
  });
});
