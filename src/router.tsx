import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import PokemonDetail from './components/pokemon/PokemonDetail'

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/pokemon/:id', element: <PokemonDetail /> }
])

export default router