import typeColors from "./colors/typeColors";
import Pokemon from "./models/Pokemon";

export const capitalizeName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

export const getPrimaryColorByType = (pokemon: Pokemon) => {
    const primaryType = pokemon?.types[0].type.name;
    return typeColors[primaryType || '']
}