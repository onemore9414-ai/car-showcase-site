// Base URL for API requests. In a real app, this comes from env vars.
const API_BASE_URL = '/api';

/**
 * Generic HTTP Client Wrapper
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
    credentials: 'same-origin', // ← added (common default for same-domain APIs)
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

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

  // Handle No Content (204)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, body: any, options?: RequestInit) =>
    request<T>(endpoint, { method: 'POST', body, ...options }),

  put: <T>(endpoint: string, body: any, options?: RequestInit) =>
    request<T>(endpoint, { method: 'PUT', body, ...options }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { method: 'DELETE', ...options }),
};