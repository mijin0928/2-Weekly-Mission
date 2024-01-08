import ReactDOM from 'react-dom/client';
import App from './App';
import ModalProvider from './components/modal/ModalProvider';
import MainProvider from './components/main/MainProvider';
import Modal from './components/modal/Modal';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <MainProvider cardUrl={''}>
      <ModalProvider>
        <Modal />
        <App />
      </ModalProvider>
    </MainProvider>
  </>
);
