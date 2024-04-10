import type { Meta, StoryObj } from '@storybook/react';

import PokemonCard from './PokemonCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient();

const meta: Meta<typeof PokemonCard> = {
    component: PokemonCard,
    decorators: [
        (Story) => (
            <ChakraProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        {Story()}
                    </BrowserRouter>
                </QueryClientProvider>
            </ChakraProvider>
        ),
    ]
}

export default meta;

type Story = StoryObj<typeof PokemonCard>;

export const Default: Story = {
    args: {
        result: {
            name: 'Bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1'
        }
    }
}