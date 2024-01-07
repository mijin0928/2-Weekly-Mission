import modalContext from './modalContext';
import { useState } from 'react';

function ModalProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState('');
  const [cardUrl, setCardUrl] = useState('');

  const handleClickModalOpen = (buttonId, cardUrl) => {
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
