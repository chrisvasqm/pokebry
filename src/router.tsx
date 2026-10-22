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
            // Split into its own chunk so the list page loads less JavaScript.
            { path: '/pokemons/:id', lazy: () => import('./components/pokemon/PokemonDetail').then(m => ({ Component: m.default })) }
        ]
    },
])

export default router