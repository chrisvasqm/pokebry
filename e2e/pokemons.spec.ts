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
    await expect(page.getByTestId('stat-number-hp')).toHaveText('45');
    await expect(page.getByTestId('stat-number-attack')).toHaveText('49');

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

test('filters the list by one and two types, then clears', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('type-chip-fire').click();
    await expect(page).toHaveURL(/\?type=fire$/);
    await expect(page.getByTestId('type-chip-fire')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('type-chip-count-fire')).not.toBeEmpty();
    await expect(page.getByTestId('list-summary')).toHaveText('Fire Pokemon');
    await expect(page.getByTestId('card-charmander').getByTestId('card-name')).toHaveText('Charmander');
    await expect(page.getByTestId('card-bulbasaur')).toHaveCount(0);

    await page.getByTestId('type-chip-flying').click();
    await expect(page).toHaveURL(/\?type=fire%2Cflying$/);
    await expect(page.getByTestId('list-summary')).toHaveText('Fire and Flying Pokemon');
    await expect(page.getByTestId('card-charizard').getByTestId('card-name')).toHaveText('Charizard');
    await expect(page.getByTestId('card-charmander')).toHaveCount(0);

    // A third pick keeps the two most recent types.
    await page.getByTestId('type-chip-water').click();
    await expect(page).toHaveURL(/\?type=flying%2Cwater$/);
    await expect(page.getByTestId('type-chip-fire')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.getByTestId('card-gyarados').getByTestId('card-name')).toHaveText('Gyarados');

    await page.getByTestId('type-filter-clear').click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId('list-summary')).toHaveText('All Pokemon');
    await expect(page.getByTestId('card-bulbasaur')).toBeVisible();
});

test('opens a filtered list from the URL and keeps the filter after viewing a Pokemon', async ({ page }) => {
    await page.goto('/?type=water');

    await expect(page.getByTestId('type-chip-water')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('card-squirtle').getByTestId('card-name')).toHaveText('Squirtle');

    await page.getByTestId('card-squirtle').click();
    await expect(page).toHaveURL(/\/pokemons\/7$/);
    await expect(page.getByTestId('type-filter')).toHaveCount(0);

    await page.goBack();
    await expect(page).toHaveURL(/\?type=water$/);
    await expect(page.getByTestId('card-squirtle')).toBeVisible();
});

test('ignores unknown types in the URL and shows an empty state for a pair with no match', async ({ page }) => {
    await page.goto('/?type=foo,fire');

    await expect(page.getByTestId('type-chip-fire')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('list-summary')).toHaveText('Fire Pokemon');

    // No Pokemon is both Fire and Fairy.
    await page.getByTestId('type-chip-fairy').click();
    await expect(page.getByTestId('list-empty')).toBeVisible();
    await expect(page.getByTestId('type-chip-count-fire')).toHaveText('0');
    await expect(page.getByTestId('list-grid').locator('a')).toHaveCount(0);
});
