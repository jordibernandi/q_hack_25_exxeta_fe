import { defineConfig } from 'vitest/config'
import path from 'path';

export default defineConfig({
    test: {
        environment: 'jsdom', // Needed for React Testing Library
        // setupFiles: './src/setupTests.ts', // Optional: only if you have this
        globals: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})