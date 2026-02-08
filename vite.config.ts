import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Only define the API KEY. Never define 'process.env': {} as it kills React.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});