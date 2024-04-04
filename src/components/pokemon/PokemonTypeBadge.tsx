import { Badge, HStack } from "@chakra-ui/react";
import typeColors from "../../colors/typeColors";
import Pokemon from "../../models/Pokemon";

interface Props {
    pokemon: Pokemon
}

const PokemonTypeBadge = ({ pokemon }: Props) => {
    return (
        <HStack marginY={2}>
            {pokemon.types.map(({ type }) =>
                <Badge
                    paddingY={1}
                    paddingX={2}
                    borderRadius={'full'}
                    backgroundColor={typeColors[type.name]}
                >
                    {type.name}
                </Badge>)}
        </HStack>
    )
}

export default PokemonTypeBadge;