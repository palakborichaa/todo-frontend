/**
 * API Configuration
 * Uses REACT_APP_API_URL environment variable
 * For local development: set in .env.local
 * For production: set in deployment platform (e.g., Vercel)
 */

export const API_URL = process.env.REACT_APP_API_URL || 'https://todo-backend-zj2u.onrender.com';
