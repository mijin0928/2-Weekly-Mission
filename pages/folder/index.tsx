import Head from 'next/head';
import Footer from '@/src/components/footer/Footer';
import AddLinkBar from '@/src/components/addLinkBar/AddLinkBar';
import Nav from '@/src/components/nav/Nav';
import Main from '@/src/components/main/Main';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TabMenu from '@/src/components/tabMenu/TabMenu';
import FolderCard from '@/src/components/card/FolderCard';
import SearchBar from '@/src/components/searchBar/SearchBar';

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
        {/* <SearchBar /> */}
          <TabMenu />
          {/* <FolderCard /> */}
          {/* <Main /> */}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
