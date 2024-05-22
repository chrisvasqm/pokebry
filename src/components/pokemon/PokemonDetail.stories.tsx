import type { Meta, StoryObj } from '@storybook/react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonDetail from './PokemonDetail';

const queryClient = new QueryClient();

const meta: Meta<typeof PokemonDetail> = {
    component: PokemonDetail,
    decorators: [
        (Story) => (
            <ChakraProvider>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter initialEntries={['/pokemons/1']}>
                        <Routes>
                            <Route element={<Story />} path='/pokemons/:id' />
                        </Routes>
                    </MemoryRouter>
                </QueryClientProvider>
            </ChakraProvider>
        )
    ]
}

export default meta;

type Story = StoryObj<typeof PokemonDetail>;

export const Default: Story = {}
