// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // makes vitest globals (describe, it, expect, vi) available without import
    globals: true,
    // jsdom environment is required for React testing library
    environment: 'jsdom',
    // optional: clear mocks between tests
    clearMocks: true,
    // optional: set a timeout (default 5000ms) – increase if needed
    setupFiles: './src/setupTests.ts',
  },
});
