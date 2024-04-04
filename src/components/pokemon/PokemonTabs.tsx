import { Tabs, TabList, Tab, TabPanels, TabPanel, Text } from "@chakra-ui/react"
import Pokemon from '../../models/Pokemon';
import PokemonStats from "./PokemonStats";

interface Props {
    pokemon: Pokemon
}

const PokemonTabs = ({ pokemon }: Props) => {
    return (
        <Tabs marginX={2} marginY={2} variant='soft-rounded' isFitted>
            <TabList>
                <Tab>Details</Tab>
                <Tab>Abilities</Tab>
                <Tab>Sounds</Tab>
                <Tab>Games</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <PokemonStats pokemon={pokemon} />
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
    )
}

export default PokemonTabs