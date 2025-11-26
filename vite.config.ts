// vite.config.ts

import path from 'path';
import { defineConfig } from 'vite'; // loadEnv jsme odebrali, není potřeba
import react from '@vitejs/plugin-react';

// Používáme zjednodušenou definici bez závislosti na `mode` a `loadEnv`.
export default defineConfig({
    // 1. OPRAVA PROBLÉMU S CSS 404 (nastavuje relativní cesty pro build)
    base: './', 
    
    server: {
        port: 3000,
        host: '0.0.0.0',
    },
    
    plugins: [react()],
    
    // 2. OPRAVA PROBLÉMU S API KLÍČEM: 
    // Sekce `define` byla odstraněna. Vite automaticky zpřístupní
    // proměnné s prefixem VITE_ přes import.meta.env.
    // Ujistěte se, že proměnná na Vercelu se jmenuje VITE_GEMINI_API_KEY!
    
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
        }
    }
});