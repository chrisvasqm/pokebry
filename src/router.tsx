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
            { path: '/pokemons/:id', lazy: () => import('./components/pokemon/PokemonDetail').then(m => ({ Component: m.default })) }
        ]
    },
])

export default router