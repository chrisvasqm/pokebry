import typeColors from "./colors/typeColors";
import Pokemon from "./models/Pokemon";

export const capitalizeName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

/** PokeAPI resource URLs end in `/<id>/`, e.g. https://pokeapi.co/api/v2/pokemon/25/ */
export const getIdFromUrl = (url: string) => Number(url.replace(/\/$/, '').split('/').pop())

export const getPrimaryColorByType = (pokemon: Pokemon) => {
    const primaryType = pokemon?.types[0].type.name;
    return typeColors[primaryType || '']
}