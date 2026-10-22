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
    await expect(page).toHaveURL(/\?type=fire&type=flying$/);
    await expect(page.getByTestId('list-summary')).toHaveText('Fire and Flying Pokemon');
    await expect(page.getByTestId('card-charizard').getByTestId('card-name')).toHaveText('Charizard');
    await expect(page.getByTestId('card-charmander')).toHaveCount(0);

    // A third pick keeps the two most recent types.
    await page.getByTestId('type-chip-water').click();
    await expect(page).toHaveURL(/\?type=flying&type=water$/);
    await expect(page.getByTestId('type-chip-fire')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.getByTestId('card-gyarados').getByTestId('card-name')).toHaveText('Gyarados');

    await page.getByTestId('type-filter-clear').click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId('list-summary')).toHaveText('All Pokemon');
    await expect(page.getByTestId('card-bulbasaur')).toBeVisible();
});

test('opens a filtered list from the URL and keeps the filter after going back from a Pokemon', async ({ page }) => {
    await page.goto('/?type=water');

    await expect(page.getByTestId('type-chip-water')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('card-squirtle').getByTestId('card-name')).toHaveText('Squirtle');

    await page.getByTestId('card-squirtle').click();
    await expect(page).toHaveURL(/\/pokemons\/7$/);
    await expect(page.getByTestId('type-filter')).toHaveCount(0);

    await page.getByTestId('details-button-back').click();
    await expect(page).toHaveURL(/\?type=water$/);
    await expect(page.getByTestId('card-squirtle')).toBeVisible();
});

test('ignores unknown types in the URL and shows an empty state for a pair with no match', async ({ page }) => {
    await page.goto('/?type=foo&type=fire');

    await expect(page.getByTestId('type-chip-fire')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('list-summary')).toHaveText('Fire Pokemon');

    // No Pokemon is both Fire and Fairy.
    await page.getByTestId('type-chip-fairy').click();
    await expect(page.getByTestId('list-empty')).toBeVisible();
    await expect(page.getByTestId('type-chip-count-fire')).toHaveText('0');
    await expect(page.getByTestId(/^card-/)).toHaveCount(0);
});

test('exposes landmarks, accessible names and robots.txt', async ({ page, request }) => {
    await page.goto('/');

    await expect(page.getByTestId('navbar')).toHaveJSProperty('tagName', 'HEADER');
    await expect(page.getByTestId('page-main')).toHaveJSProperty('tagName', 'MAIN');
    // Chakra puts the test id on the Switch's label wrapper; the name belongs to its input.
    await expect(page.getByTestId('navbar-switch').getByRole('checkbox')).toHaveAccessibleName('Dark mode');
    await expect(page.getByTestId('navbar-search')).toHaveAccessibleName('Search Pokemon');
    const card = page.getByTestId('card-bulbasaur');
    // Wait for the loaded card; while loading it has no sprite at all.
    await expect(card.getByTestId('card-name')).toHaveText('Bulbasaur');
    await expect(card.getByRole('link')).toHaveAccessibleName('Bulbasaur');
    await expect(card.getByRole('img')).toHaveCount(0); // decorative sprite (alt="") has no img role

    await card.click();
    await expect(page.getByTestId('details-button-back')).toHaveAccessibleName('Back to list');
    await expect(page.getByTestId('page-main')).toHaveJSProperty('tagName', 'MAIN');

    const robots = await request.get('/robots.txt');
    expect(await robots.text()).toContain('User-agent: *');
});

test('loads list sprites and detail artwork from their id-based URLs', async ({ page }) => {
    await page.goto('/');

    const sprite = page.getByTestId('card-image-bulbasaur');
    await expect(sprite).toHaveAttribute('src', /\/sprites\/pokemon\/1\.png$/);
    await expect.poll(() => sprite.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

    await page.getByTestId('card-bulbasaur').click();
    const artwork = page.getByTestId('details-image');
    await expect.poll(() => artwork.evaluate((image: HTMLImageElement) => image.currentSrc)).toMatch(/\/official-artwork\/1\.png$/);
    await expect.poll(() => artwork.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
});

test.describe('on a phone', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('the detail page shows the small sprite instead of the artwork', async ({ page }) => {
        await page.goto('/pokemons/1');

        const artwork = page.getByTestId('details-image');
        await expect.poll(() => artwork.evaluate((image: HTMLImageElement) => image.currentSrc)).toMatch(/\/sprites\/pokemon\/1\.png$/);
        await expect.poll(() => artwork.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    });
});

test.describe('missing sprite', () => {
    test.use({ allowedConsoleErrors: [/Failed to load resource/] });

    test('falls back to the pokeball image', async ({ page }) => {
        await page.route(/\/sprites\/pokemon\/1\.png$/, route => route.fulfill({ status: 404 }));
        await page.goto('/');

        await expect(page.getByTestId('card-image-bulbasaur')).toHaveAttribute('src', /\/pokeball\.png$/);
    });

    test('the detail page falls back to the sprite, then to the pokeball image', async ({ page }) => {
        await page.route(/\/official-artwork\/1\.png$/, route => route.fulfill({ status: 404 }));
        await page.goto('/pokemons/1');

        const artwork = page.getByTestId('details-image');
        await expect.poll(() => artwork.evaluate((image: HTMLImageElement) => image.currentSrc)).toMatch(/\/sprites\/pokemon\/1\.png$/);

        await page.route(/\/sprites\/pokemon\/1\.png$/, route => route.fulfill({ status: 404 }));
        await page.reload();
        await expect.poll(() => artwork.evaluate((image: HTMLImageElement) => image.currentSrc)).toMatch(/\/pokeball\.png$/);
    });
});

test('a non-numeric Pokemon id shows a message and a way back without fetching', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', request => { if (request.url().includes('/pokemon/abc')) requests.push(request.url()); });
    await page.goto('/pokemons/abc');

    await expect(page.getByTestId('details-error')).toBeVisible();
    await expect(page.getByTestId('details-button-back')).toBeVisible();
    expect(requests).toEqual([]);
});
