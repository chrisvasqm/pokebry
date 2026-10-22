import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { MotionConfig } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom'
import router from './router';
import theme from './theme';

const client = new QueryClient();

// After a deploy, an open tab may ask for a chunk that no longer exists: reload once to get the new build.
const RELOAD_KEY = 'chunk-reload-at';
window.addEventListener('vite:preloadError', (event) => {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
    // A second failure within a minute means the chunk is really missing; let the error page show.
    if (Date.now() - last < 60_000) return;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Storage can be blocked; reloading is still the best recovery.
  }
  event.preventDefault();
  window.location.reload();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <MotionConfig reducedMotion='user'>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </MotionConfig>
    </ChakraProvider>
  </React.StrictMode>
);
