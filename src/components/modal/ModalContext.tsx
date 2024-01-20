import { createContext } from 'react';

interface ModalContext {
  modalOpen: boolean;
  type: string;
  cardUrl?: string;
  handleModalOpen: (buttonId: string, cardUrl?: string) => void;
  handleModalClose: () => void;
}

const ModalContext = createContext<ModalContext>({
  modalOpen: false,
  type: '',
  cardUrl: '',
  handleModalOpen: () => {},
  handleModalClose: () => {},
});

export default ModalContext;
