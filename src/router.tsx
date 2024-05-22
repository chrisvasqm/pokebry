import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import ErrorPage from './components/ErrorPage'
import PokemonsContainer from './components/pokemon/PokemonContainer'
import PokemonDetail from './components/pokemon/PokemonDetail'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: '/', element: <PokemonsContainer /> },
            { path: '/pokemons/:id', element: <PokemonDetail /> }
        ]
    },
])

export default router