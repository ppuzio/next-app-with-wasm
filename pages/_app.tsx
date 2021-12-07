import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return <QueryClientProvider client={queryClient}><Component {...pageProps} /></QueryClientProvider>
}

export default MyApp
