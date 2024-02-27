import type { AppProps } from 'next/app';
import ModalProvider from '@/src/components/modal/ModalProvider';
import GlobalStyle from '@/styles/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </QueryClientProvider>
    </>
  );
}
