import ButtonOption from './ButtonOption';
import CardList from './CardList';
import MainProvider from './MainProvider';
import TabMenu from './TabMenu';
import SearchBar from './SearchBar';
import Modal from '../modal/Modal';

const cardUrl = '';

function Main() {
  return (
    <>
      <MainProvider cardUrl={cardUrl}>
        <Modal />
        <SearchBar />
        <TabMenu />
        <ButtonOption />
        <CardList />
      </MainProvider>
    </>
  );
}

export default Main;
