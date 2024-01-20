import ModalContext from '@/src/components/modal/ModalContext';
import { useState, ReactNode } from 'react';

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [cardUrl, setCardUrl] = useState<string | undefined>('');

  const handleModalOpen = (buttonId: string, cardUrl?: string) => {
    setModalOpen(true);
    setType(buttonId);
    setCardUrl(cardUrl);
  };

  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <ModalContext.Provider
        value={{
          modalOpen,
          type,
          cardUrl,
          handleModalOpen,
          handleModalClose: handleModalClose,
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
}
