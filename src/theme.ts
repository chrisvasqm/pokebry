import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    semanticTokens: {
        colors: {
            // Secondary text; gray.500 is below 4.5:1 contrast on both white and dark surfaces.
            'text.muted': { default: 'gray.600', _dark: 'gray.300' },
            // Text on the pastel type colors (cards, badges): every type color clears 4.5:1 against it.
            'type.fg': 'gray.900',
            // Highlighted row, e.g. the active search result.
            'bg.active': { default: 'blackAlpha.200', _dark: 'whiteAlpha.200' },
        },
    },
});

export default theme;
