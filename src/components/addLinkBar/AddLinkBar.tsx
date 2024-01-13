import styled from 'styled-components';
import { ChangeEvent, useContext, useState } from 'react';
import ModalContext from '@/src/components/modal/ModalContext';

export default function AddLinkBar() {
  const { handleClickModalOpen } = useContext(ModalContext);
  const [linkValue, setLinkValue] = useState<string>('');

  const handleChangeLinkValue = (e: ChangeEvent<HTMLInputElement>) =>
    setLinkValue(e.target.value);

  return (
    <>
      <AddLinkBarContainer>
        <Wrap>
          <Input
            type="text"
            placeholder="링크를 추가해보세요"
            onChange={handleChangeLinkValue}
            value={linkValue}
          />
          <Button
            type="button"
            onClick={() => linkValue && handleClickModalOpen('folderAdd')}
          >
            추가하기
          </Button>
        </Wrap>
      </AddLinkBarContainer>
    </>
  );
}

const AddLinkBarContainer = styled.div`
  padding: 6rem 0 9rem 0;

  @media screen and (max-width: 1124px) {
    padding: 6rem 3.2rem 9rem 3.2rem;
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    padding: 2.4rem 3.2rem 4rem 3.2rem;
  }
`;

const Wrap = styled.div`
  position: relative;
  width: 80rem;
  margin: 0 auto;

  @media screen and (max-width: 1124px) {
    width: 100%;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: url('/image/ico-link.png') no-repeat;

    @media screen and (min-width: 375px) and (max-width: 768px) {
      left: 1rem;
    }
  }
`;

const Input = styled.input`
  width: 80rem;
  padding: 2.2rem 5.2rem;
  border-radius: 15px;
  border: 1px solid var(--primary);
  color: var(--gray60);
  font-size: 1.6rem;
  outline: none;

  @media screen and (max-width: 1124px) {
    width: 100%;
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    padding: 1.8rem 3.4rem;
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  border: none;
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
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

  @media screen and (min-width: 375px) and (max-width: 768px) {
    right: 1rem;
  }
`;