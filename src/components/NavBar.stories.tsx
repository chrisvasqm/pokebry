import type { Meta, StoryObj } from '@storybook/react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

const meta: Meta<typeof NavBar> = {
    component: NavBar,
    decorators: [
        (Story) => (
            <ChakraProvider>
                <QueryClientProvider client={new QueryClient()}>
                    <MemoryRouter>
                        <Story />
                    </MemoryRouter>
                </QueryClientProvider>
            </ChakraProvider>
        )
    ]
}

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {}
