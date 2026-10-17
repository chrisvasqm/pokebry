import typeColors from "./colors/typeColors";
import Pokemon from "./models/Pokemon";

export const capitalizeName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

/** PokeAPI resource URLs end in `/<id>/`, e.g. https://pokeapi.co/api/v2/pokemon/25/. Undefined when the URL has no numeric id. */
export const getIdFromUrl = (url: string) => {
    const id = Number(url.replace(/\/$/, '').split('/').pop())
    return Number.isInteger(id) && id > 0 ? id : undefined
}

export const getPrimaryColorByType = (pokemon: Pokemon) => {
    const primaryType = pokemon?.types[0].type.name;
    return typeColors[primaryType || '']
}