import { test as base, expect, Page } from '@playwright/test';

/**
 * Fails a test when any page in the context logs a console error or throws an uncaught error.
 * Expected failures (e.g. a deliberate 404) can be allowed per test via `allowedConsoleErrors`.
 */
export const test = base.extend<{ allowedConsoleErrors: RegExp[] }>({
    allowedConsoleErrors: [[], { option: true }],
    context: async ({ context, allowedConsoleErrors }, use) => {
        const errors: string[] = [];
        const watch = (page: Page) => {
            page.on('console', message => {
                if (message.type() !== 'error') return;
                const text = message.text();
                // `search` ignores RegExp lastIndex, unlike `test`, so global patterns behave.
                if (allowedConsoleErrors.some(pattern => text.search(pattern) !== -1)) return;
                errors.push(text);
            });
            page.on('pageerror', error => errors.push(error.message));
        };
        context.pages().forEach(watch);
        context.on('page', watch);

        await use(context);

        expect(errors, 'console errors during the test').toEqual([]);
    },
});

export { expect };
