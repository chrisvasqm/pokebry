import type { Meta, StoryObj } from '@storybook/react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const queryClient = new QueryClient();

const meta: Meta<typeof ErrorPage> = {
    component: ErrorPage,
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

type Story = StoryObj<typeof ErrorPage>;

export const Default: Story = {}
