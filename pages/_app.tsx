import type { AppProps } from 'next/app';
import ModalProvider from '@/src/components/modal/ModalProvider';
import MainProvider from '@/src/components/main/MainProvider';
import GlobalStyle from '@/styles/GlobalStyle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <MainProvider cardUrl="">
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </MainProvider>
    </>
  );
}
