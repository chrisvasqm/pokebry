import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import PokemonDetail from './components/pokemon/PokemonDetail'
import PokemonsContainer from './components/pokemon/PokemonContainer'
import ErrorPage from './components/ErrorPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: '/pokemons', element: <PokemonsContainer /> },
            { path: '/pokemons/:id', element: <PokemonDetail /> }
        ]
    },
])

export default router