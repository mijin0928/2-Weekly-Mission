import ButtonOption from '@/src/components/main/ButtonOption';
import MainProvider from '@/src/components/main/MainProvider';
import TabMenu from '@/src/components/main/TabMenu';
import SearchBar from '@/src/components/main/SearchBar';
import Modal from '@/src/components/modal/Modal';
import FolderCard from '@/src/components/card/FolderCard';

export default function Main() {
  return (
    <>
      <MainProvider cardUrl="">
        <Modal />
        <SearchBar />
        <TabMenu />
        <ButtonOption />
        <FolderCard />
      </MainProvider>
    </>
  );
}
