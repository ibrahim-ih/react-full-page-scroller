import { defineConfig, devices } from '@playwright/test'

const port = Number(process.env.E2E_PORT || 4173)

// Same fixed browser, viewport and server on every run (local, agent, CI).
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: !!process.env.CI,
  timeout: 30_000,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['list']],
  outputDir: 'test-results',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    viewport: { width: 1280, height: 720 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Set E2E_BROWSER_CHANNEL=chrome to reuse an installed Google Chrome.
        channel: process.env.E2E_BROWSER_CHANNEL || 'chromium'
      }
    }
  ],
  webServer: {
    command: 'node e2e/serve-demo.js',
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  }
})
