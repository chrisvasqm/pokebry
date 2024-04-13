import type { Meta, StoryObj } from '@storybook/react';

import PokemonsContainer from './PokemonContainer';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient();

const meta: Meta<typeof PokemonsContainer> = {
    component: PokemonsContainer,
    decorators: [
        (Story) => (
            <ChakraProvider>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <Story />
                    </MemoryRouter>
                </QueryClientProvider>
            </ChakraProvider>
        )
    ]
}

export default meta;

type Story = StoryObj<typeof PokemonsContainer>;

export const Default: Story = {}
