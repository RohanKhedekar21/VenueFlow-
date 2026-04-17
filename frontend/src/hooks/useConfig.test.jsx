import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { useConfig } from './useConfig';

vi.mock('axios');

describe('useConfig Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches config successfully from backend', async () => {
    const mockConfig = {
      googleMapsApiKey: 'test-maps-key',
      firebaseApiKey: 'test-fb-key',
      firebaseProjectId: 'test-project'
    };

    axios.get.mockResolvedValueOnce({ data: mockConfig });

    const { result } = renderHook(() => useConfig());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.config).toEqual(mockConfig);
    expect(result.current.error).toBe(null);
    expect(axios.get).toHaveBeenCalledWith('/api/config');
  });

  it('falls back to local environment variables on failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useConfig());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Should return an object with empty strings or VITE_ values (which are usually empty in test env)
    expect(result.current.config).toHaveProperty('googleMapsApiKey');
    expect(result.current.isLoading).toBe(false);
  });
});
