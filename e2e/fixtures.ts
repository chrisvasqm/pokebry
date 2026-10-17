import { test as base, expect } from '@playwright/test';

/**
 * Fails a test when the page logs a console error or throws an uncaught error.
 * Expected network failures can be allowed per test via `allowedConsoleErrors`.
 */
export const test = base.extend<{ allowedConsoleErrors: RegExp[] }>({
    allowedConsoleErrors: [[], { option: true }],
    page: async ({ page, allowedConsoleErrors }, use) => {
        const errors: string[] = [];
        page.on('console', message => {
            if (message.type() !== 'error') return;
            const text = message.text();
            if (allowedConsoleErrors.some(pattern => pattern.test(text))) return;
            errors.push(text);
        });
        page.on('pageerror', error => errors.push(error.message));

        await use(page);

        expect(errors, 'console errors during the test').toEqual([]);
    },
});

export { expect };
