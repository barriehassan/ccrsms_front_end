import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import basicSsl from '@vitejs/plugin-basic-ssl';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // basicSsl()
  ],
  server: {
    // Allows ngrok to tunnel to the dev server without "Invalid Host header" errors
    allowedHosts: [
      'unconvenable-nonservilely-gretta.ngrok-free.dev'
    ],
    // host: true,  
    // https: true
  }
})
