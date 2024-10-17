import { defineConfig } from 'cypress';

require('dotenv').config();

export default defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:4000',
    env: {
      BURGER_API_URL: process.env.BURGER_API_URL
    }
  }
});
