import { mockFetch } from './mockAdapter';

// Base URL for API requests. In a real app, this comes from env vars.
const API_BASE_URL = '/api';

/**
 * Generic HTTP Client Wrapper
 * Currently uses mockFetch, but designed to be swapped with window.fetch easily.
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { body, headers, ...customConfig } = options;

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  // SWAP THIS LINE FOR REAL BACKEND:
  // const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const response = await mockFetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Something went wrong';
    try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
    } catch {
        errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Handle No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => request<T>(endpoint, { method: 'GET', ...options }),
  post: <T>(endpoint: string, body: any, options?: RequestInit) => request<T>(endpoint, { method: 'POST', body, ...options }),
  put: <T>(endpoint: string, body: any, options?: RequestInit) => request<T>(endpoint, { method: 'PUT', body, ...options }),
  delete: <T>(endpoint: string, options?: RequestInit) => request<T>(endpoint, { method: 'DELETE', ...options }),
};
