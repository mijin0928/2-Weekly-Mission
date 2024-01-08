import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import AddLinkBar from '../components/AddLinkBar';
import Nav from '../components/Nav';
import Main from '../components/main/Main';

function FolderPage() {
  return (
    <>
      <Helmet>
        <title>FolderPage</title>
      </Helmet>
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

export default FolderPage;
