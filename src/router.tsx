import { createBrowserRouter } from 'react-router-dom'
import Layout from './App'
import PokemonDetail from './components/pokemon/PokemonDetail'
import PokemonsContainer from './components/pokemon/PokemonContainer'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/pokemons', element: <PokemonsContainer /> },
            { path: '/pokemons/:id', element: <PokemonDetail /> }
        ]
    },
])

export default router