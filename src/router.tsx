import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import PokemonsContainer from './components/pokemon/PokemonContainer'
import ErrorPage from './components/ErrorPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: '/', element: <PokemonsContainer /> },
            // Own chunk: the list page does not load the detail code. main.tsx reloads when a chunk is gone after a deploy.
            { path: '/pokemons/:id', lazy: () => import('./components/pokemon/PokemonDetail').then(m => m
                // Undefined when main.tsx took over a failed chunk load: stay pending while the page reloads.
                ? { Component: m.default }
                : new Promise<never>(() => undefined)) }
        ]
    },
])

export default router