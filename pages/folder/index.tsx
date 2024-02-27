import Head from 'next/head';
import Footer from '@/src/components/footer/Footer';
import AddLinkBar from '@/src/components/addLinkBar/AddLinkBar';
import Nav from '@/src/components/nav/Nav';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TabMenu from '@/src/components/tabMenu/TabMenu';
import Modal from '@/src/components/modal/Modal';
export default function FolderPage() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) router.push('/signin');
  }, []);

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
          <TabMenu />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
