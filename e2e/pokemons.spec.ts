import { expect, test } from './fixtures';

test('home lists Pokemon cards', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('list-grid')).toBeVisible();
    const card = page.getByTestId('card-bulbasaur');
    await expect(card.getByTestId('card-name')).toHaveText('Bulbasaur');
});

test('opens a Pokemon from the list and browses its tabs', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('card-bulbasaur').click();
    await expect(page).toHaveURL(/\/pokemons\/1$/);
    await expect(page.getByTestId('details-name')).toHaveText('Bulbasaur');
    await expect(page.getByTestId('badge-grass')).toBeVisible();
    await expect(page.getByTestId('stat-hp')).toBeVisible();

    await page.getByTestId('tab-abilities-title').click();
    await expect(page.getByTestId('tab-abilities-content')).toBeVisible();

    await page.getByTestId('tab-sounds-title').click();
    await expect(page.getByTestId('audio-latest')).toBeVisible();

    await page.getByTestId('details-button-back').click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId('list-grid')).toBeVisible();
});

test('searches a Pokemon and opens it', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('navbar-search').click();
    await page.getByTestId('search-input').fill('pikachu');
    await page.getByTestId('search-result-pikachu').click();

    await expect(page).toHaveURL(/\/pokemons\/25$/);
    await expect(page.getByTestId('details-name')).toHaveText('Pikachu');
});

test('unknown route shows the error page and goes home', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');

    await expect(page.getByTestId('error-title')).toBeVisible();
    await page.getByTestId('error-button-home').click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId('list-grid')).toBeVisible();
});
