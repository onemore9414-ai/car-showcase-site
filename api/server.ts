import { carsController } from './cars';
import { usersController } from './users';
import { adminController } from './admin';

interface Response {
  status: number;
  body: any;
}

export async function handleRequest(url: string, method: string, body: any): Promise<Response> {
  // Normalize path: remove /api prefix and trailing slash
  let path = url.replace('/api', '');
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  
  // --- CARS ---
  // Exact match for /cars
  if (path === '/cars') {
    if (method === 'GET') return carsController.getAll();
    if (method === 'POST') return carsController.create(body);
  }
  
  // Match /cars/:id
  const carMatch = path.match(/^\/cars\/([^/]+)$/);
  if (carMatch) {
    const id = carMatch[1];
    if (method === 'GET') return carsController.getOne(id);
    if (method === 'PUT') return carsController.update(id, body);
    if (method === 'DELETE') return carsController.delete(id);
  }

  // --- USERS / AUTH ---
  if (path === '/users') {
    if (method === 'GET') return usersController.getAll();
    if (method === 'PUT') return usersController.updateProfile(body);
  }

  if (path === '/auth/login' && method === 'POST') {
    return usersController.login(body);
  }

  if (path === '/auth/signup' && method === 'POST') {
    return usersController.signup(body);
  }

  if (path === '/auth/verify' && method === 'POST') {
    return usersController.verify(body);
  }

  if (path === '/auth/forgot-password' && method === 'POST') {
    return usersController.forgotPassword(body);
  }

  if (path === '/auth/reset-password' && method === 'POST') {
    return usersController.resetPassword(body);
  }

  // --- ADMIN / CONFIG ---
  if (path === '/config') {
    if (method === 'GET') return adminController.getConfig();
    if (method === 'PUT') return adminController.updateConfig(body);
    if (method === 'DELETE') return adminController.resetConfig();
  }

  if (path === '/admin/stats' && method === 'GET') {
    return adminController.getStats();
  }

  return { status: 404, body: { message: `Endpoint ${path} not found` } };
}