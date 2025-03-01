import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://smarter-edu-backend.onrender.com'
  : 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': API_BASE_URL,
    },
  },
});
