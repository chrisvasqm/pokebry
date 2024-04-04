import { Card, Center, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import usePokemon from "../../hooks/usePokemon";
import useTitleStore from "../../store/useTitleStore";

const PokemonDetail = () => {
  const { id } = useParams();
  const { data: pokemon, isLoading, error } = usePokemon(parseInt(id!));
  const setTitle = useTitleStore(state => state.setTitle);

  useEffect(() => {
    setTitle(pokemon?.name || '');
  }, [pokemon?.name, setTitle])

  if (isLoading) return <Text>Loading...</Text>

  if (error) return <Text>{error.message}</Text>

  return (
    <Card>
      <Center>
        <VStack>
          <Image
            src={pokemon?.sprites.other["official-artwork"].front_default}
            boxSize={'250px'}
          />
        </VStack>
      </Center>
      <Tabs marginX={2} marginY={2} variant='soft-rounded' colorScheme="green" isFitted>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Abilities</Tab>
          <Tab>Sounds</Tab>
          <Tab>Games</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text>Details...</Text>
          </TabPanel>
          <TabPanel>
            <Text>Abilities...</Text>
          </TabPanel>
          <TabPanel>
            <Text>Sounds...</Text>
          </TabPanel>
          <TabPanel>
            <Text>Games...</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  )
}

export default PokemonDetail