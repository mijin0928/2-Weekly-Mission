import ModalContext from '@/src/components/modal/ModalContext';
import { useState, ReactNode } from 'react';

export default function ModalProvider({ children }: { children: ReactNode }) {
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
      <ModalContext.Provider
        value={{
          modalOpen,
          type,
          cardUrl,
          handleClickModalOpen,
          handleClickModalClose,
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
}
