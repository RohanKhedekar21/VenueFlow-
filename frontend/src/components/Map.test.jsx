import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import Map from './Map';

describe('Map Heatmap UI', () => {
  it('correctly maps Low Traffic strings dynamically', () => {
    render(<Map crowdData={{ 'concourse-n': { density: 0.1 } }} />);
    expect(screen.getByText(/North Concourse: Low/i)).toBeDefined();
  });
  
  it('correctly maps High Traffic strings dynamically', () => {
    render(<Map crowdData={{ 'concourse-n': { density: 0.9 } }} />);
    expect(screen.getByText(/North Concourse: High/i)).toBeDefined();
  });
});
