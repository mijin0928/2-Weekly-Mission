import styled from 'styled-components';
import { useContext } from 'react';
import ModalContext from '@/src/components/modal/ModalContext';
import useModalAsync from '@/src/hook/useModalAsync';

export default function AddLinkBar() {
  const { handleModalOpen } = useContext(ModalContext);
  const { values, handleValuesChange } = useModalAsync();

  const handleUrl = () => {
    if (values.url) {
      handleModalOpen('folderAdd');
    }
  };

  return (
    <>
      <AddLinkBarContainer>
        <Input
          type="text"
          placeholder="링크를 추가해보세요"
          onChange={handleValuesChange}
          value={values.url}
          name="url"
        />
        <Button type="button" onClick={handleUrl}>
          추가하기
        </Button>
      </AddLinkBarContainer>
    </>
  );
}

const AddLinkBarContainer = styled.div`
  position: relative;
  width: 80rem;
  margin: 0 auto;
  padding: 6rem 0 9rem 0;
  background-color: var(--bg);

  &.active {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    z-index: 1;
    width: 100%;
    padding: 2.4rem 3.2rem;
    background-color: var(--bg);
  }

  @media screen and (max-width: 1124px) {
    padding: 6rem 3.2rem 9rem 3.2rem;
    width: 100%;
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    padding: 2.4rem 3.2rem 4rem 3.2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 2.2rem 5.2rem;
  border-radius: 15px;
  border: 1px solid var(--primary);
  color: var(--gray60);
  font-size: 1.6rem;
  outline: none;
  background: url('/image/ico-link.png') no-repeat 2rem center var(--white);

  @media screen and (min-width: 375px) and (max-width: 768px) {
    padding: 1.8rem 4.4rem;
    font-size: 1.4rem;
    background: url('/image/ico-link.png') no-repeat 1.6rem center var(--white);
  }
`;

const Button = styled.button`
  border: none;
  position: absolute;
  right: 2rem;
  top: 7.5rem;
  display: block;
  width: 8rem;
  height: 3.7rem;
  cursor: pointer;
  background-image: linear-gradient(135deg, #6d6afe 0%, #6ae3fe 100%);
  border-radius: 0.8rem;
  color: var(--gray-f5f5);
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  line-height: 3.7rem;

  @media screen and (max-width: 1124px) {
    right: 5.2rem;
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    right: 1rem;
  }
`;
