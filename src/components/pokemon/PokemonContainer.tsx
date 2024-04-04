import usePokemons from "../../hooks/usePokemons"

const PokemonsContainer = () => {
    const { data: pokemons, isLoading, error } = usePokemons();

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>{error.message}</p>

    return (
        <ul>
            {pokemons?.map(pokemon => <li>{pokemon.name}</li>)}
        </ul>
    )
}

export default PokemonsContainer