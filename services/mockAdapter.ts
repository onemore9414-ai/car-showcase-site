import { handleRequest } from '../api/server';

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Response class to match Fetch API
class MockResponse {
  constructor(public body: any, public init?: ResponseInit) {}
  
  get ok() { 
    return (this.init?.status || 200) >= 200 && (this.init?.status || 200) < 300; 
  }
  
  get status() { 
    return this.init?.status || 200; 
  }
  
  get statusText() {
    return this.init?.statusText || 'OK';
  }

  async json() { 
    return this.body; 
  }
  
  async text() { 
    return typeof this.body === 'string' ? this.body : JSON.stringify(this.body); 
  }
}

export async function mockFetch(url: string, config: RequestInit): Promise<MockResponse> {
  // Simulate Network Latency
  await delay(300 + Math.random() * 400); 

  const method = config.method || 'GET';
  const body = config.body ? JSON.parse(config.body as string) : null;

  try {
    // Forward request to the Mock Server Router
    const response = await handleRequest(url, method, body);
    
    return new MockResponse(response.body, { 
      status: response.status,
      statusText: response.status === 200 ? 'OK' : 'Error'
    });
  } catch (error) {
    console.error('Mock Server Error:', error);
    return new MockResponse({ message: 'Internal Server Error' }, { status: 500 });
  }
}