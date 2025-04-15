import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,  // Hap automatikisht shfletuesin
    port: 5173   // Sigurohuni që porti është i saktë
  }
});
