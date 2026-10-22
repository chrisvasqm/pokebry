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
const SPRITES = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

/** Alternate forms (megas, regional forms) start here; many of them have no image upstream. */
export const FIRST_FORM_ID = 10001

/** Sprite URLs follow a fixed pattern per id, so images can load before the Pokemon's own data arrives. */
export const getSpriteUrl = (id: number) => `${SPRITES}/${id}.png`

export const getArtworkUrl = (id: number) => `${SPRITES}/other/official-artwork/${id}.png`

/** Fallback when a Pokemon has no image at the expected URL (some alternate forms). */
export const FALLBACK_IMAGE = '/pokeball.png'
