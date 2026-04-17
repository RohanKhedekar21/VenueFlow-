import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Map from './Map';

vi.mock('@react-google-maps/api', () => ({
  useJsApiLoader: () => ({ isLoaded: true }),
  GoogleMap: ({ children }) => <div>{children}</div>,
  OverlayView: ({ children }) => <div>{children}</div>,
}));

describe('Map Heatmap UI', () => {
  it('correctly maps Low Traffic strings dynamically', () => {
    // 0.1 should render as 10%
    render(<Map crowdData={{ 'concourse-n': { density: 0.1 } }} apiKey="dummy" />);
    expect(screen.getByText(/North Concourse: 10%/i)).toBeDefined();
  });
  
  it('correctly maps High Traffic strings dynamically', () => {
    // 0.9 should render as 90%
    render(<Map crowdData={{ 'concourse-n': { density: 0.9 } }} apiKey="dummy" />);
    expect(screen.getByText(/North Concourse: 90%/i)).toBeDefined();
  });
});
