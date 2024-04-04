import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom"

const PokemonDetail = () => {
  const { id } = useParams();

  if (!id) return <Text>Pokemon not found.</Text>

  return (
    <div>PokemonDetail</div>
  )
}

export default PokemonDetail