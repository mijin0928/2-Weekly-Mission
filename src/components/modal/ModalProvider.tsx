import modalContext from './modalContext';
import { useState, ReactNode } from 'react';

function ModalProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [cardUrl, setCardUrl] = useState<string | undefined>('');

  const handleClickModalOpen = (buttonId: string, cardUrl?: string) => {
    setModalOpen(true);
    setType(buttonId);
    setCardUrl(cardUrl);
  };

  const handleClickModalClose = () => setModalOpen(false);

  return (
    <>
      <modalContext.Provider
        value={{
          modalOpen,
          type,
          cardUrl,
          handleClickModalOpen,
          handleClickModalClose,
        }}
      >
        {children}
      </modalContext.Provider>
    </>
  );
}

export default ModalProvider;
