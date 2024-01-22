import Head from 'next/head';
import Footer from '@/src/components/footer/Footer';
import AddLinkBar from '@/src/components/addLinkBar/AddLinkBar';
import Nav from '@/src/components/nav/Nav';
import Main from '@/src/components/main/Main';

export default function FolderPage() {
  return (
    <>
      <Head>
        <title>FolderPage</title>
      </Head>
      <div>
        <header>
          <Nav />
          <AddLinkBar />
        </header>
        <main>
          <Main />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

