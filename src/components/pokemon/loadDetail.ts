/** Importer for the detail chunk. Not prefetched: a failed prefetch after a deploy would reload the page under the cursor. */
export const loadPokemonDetail = () => import('./PokemonDetail');

/**
 * Route `lazy` for a default-exported component. When main.tsx takes over a failed chunk load after a deploy,
 * Vite resolves the import to undefined; stay pending while the page reloads instead of crashing.
 */
export const lazyComponent = <T,>(importer: () => Promise<{ default: T } | undefined>) => () =>
    importer().then(module => module
        ? { Component: module.default }
        : new Promise<never>(() => undefined));
