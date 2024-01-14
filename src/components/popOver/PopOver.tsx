import styled from 'styled-components';
import { useContext } from 'react';
import ModalContext from '@/src/components/modal/ModalContext';
import { BUTTON } from '@/constant';

interface PopOverProps {
  popOverOpen: boolean;
  cardUrl: string;
}

export default function PopOver({ popOverOpen, cardUrl }: PopOverProps) {
  const { handleClickModalOpen } = useContext(ModalContext);

  return (
    <>
      <PopOverContainer $popOverOpen={popOverOpen}>
        {BUTTON.map((button) => (
          <Button
            key={button.id}
            type="button"
            onClick={() => handleClickModalOpen(button.id, cardUrl)}
          >
            {button.name}
          </Button>
        ))}
      </PopOverContainer>
    </>
  );
}

const PopOverContainer = styled.div<{ $popOverOpen?: boolean }>`
  display: ${({ $popOverOpen }) => ($popOverOpen ? 'block' : 'none')};
  position: absolute;
  right: -4rem;
  bottom: 2.1rem;
  text-align: center;
  box-shadow: 0px 2px 8px 0px #3332361a;
`;

const Button = styled.button`
  display: block;
  width: 10rem;
  height: 3.1rem;
  line-height: 3.1rem;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;

  &:first-child {
    color: var(--light-gray100);
    background-color: var(--white);
  }

  &:last-child {
    color: var(--primary);
    background-color: var(--gray10);
  }
`;