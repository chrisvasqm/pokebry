import { Badge, HStack } from "@chakra-ui/react";
import typeColors from "../../colors/typeColors";
import { Types } from "../../models/Pokemon";

interface Props {
    types: Types[]
}

const PokemonTypeBadge = ({ types }: Props) => {
    return (
        <HStack marginY={2}>
            {types.map(({ type }) =>
                <Badge
                    id={`badge-${type.name}`}
                    paddingY={1}
                    paddingX={4}
                    borderRadius={'full'}
                    fontWeight={'bold'}
                    fontSize={'xs'}
                    color={'white'}
                    backgroundColor={typeColors[type.name]}
                >
                    {type.name}
                </Badge>)}
        </HStack>
    )
}

export default PokemonTypeBadge;