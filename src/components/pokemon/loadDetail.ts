/** One importer for the detail chunk: the route loads it, and cards prefetch it on hover or focus. */
export const loadPokemonDetail = () => import('./PokemonDetail');

/**
 * Route `lazy` for a default-exported component. When main.tsx takes over a failed chunk load after a deploy,
 * Vite resolves the import to undefined; stay pending while the page reloads instead of crashing.
 */
export const lazyComponent = <T,>(importer: () => Promise<{ default: T } | undefined>) => () =>
    importer().then(module => module
        ? { Component: module.default }
        : new Promise<never>(() => undefined));
