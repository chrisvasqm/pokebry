import { defineConfig, devices } from '@playwright/test';

const PORT = 5179;

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? 'github' : 'list',
    expect: { timeout: 10_000 },
    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: {
        // Development build served by Vite preview: React keeps its console warnings (which fail tests)
        // and there is no dev-server dependency pre-bundling that could reload the page mid-test.
        // Vite only picks React's development bundle when NODE_ENV itself is set, --mode alone is not enough.
        command: `pnpm exec vite build --mode development --outDir dist-e2e && pnpm exec vite preview --outDir dist-e2e --port ${PORT} --strictPort`,
        env: { NODE_ENV: 'development' },
        url: `http://localhost:${PORT}`,
        // Always build and serve fresh so a stale server on the port can never make the suite pass.
        reuseExistingServer: false,
        timeout: 120_000,
    },
});
