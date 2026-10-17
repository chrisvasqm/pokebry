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
        testIdAttribute: 'data-testid',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: {
        // Production build served by Vite preview: no dev-only dependency pre-bundling or reloads mid-test.
        command: `pnpm build && pnpm preview --port ${PORT} --strictPort`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
    },
});
