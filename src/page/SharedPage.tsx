import { Helmet } from 'react-helmet';
import FolderUser from '../components/FolderUser';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SearchBar from '../components/main/SearchBar';
import CardList from '../components/main/CardList';

function SharedPage() {
  return (
    <>
      <Helmet>
        <title>SharedPage</title>
      </Helmet>
      <div>
        <header>
          <Nav />
          <FolderUser/>
        </header>
        <main>
          <SearchBar />
          <CardList />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default SharedPage;
