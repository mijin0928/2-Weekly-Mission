import styled from 'styled-components';
import { useContext } from 'react';
import ModalContext from '@/src/components/modal/ModalContext';
import { BUTTON_OPTION } from '@/constant';

interface Props {
  title: string;
  buttonOption?: boolean;
  selectedMenu: string;
}
export default function ButtonOption({
  title,
  buttonOption,
  selectedMenu,
}: Props) {
  const { handleModalOpen } = useContext(ModalContext);

  return (
    <>
      <ButtonOptionContainer>
        <Title>{title}</Title>
        <Option $selectedMenu={selectedMenu} $buttonOption={buttonOption}>
          {BUTTON_OPTION.map((button) => (
            <Button
              key={button.id}
              type="button"
              onClick={() => handleModalOpen(button.id)}
            >
              {button.name}
            </Button>
          ))}
        </Option>
      </ButtonOptionContainer>
    </>
  );
}

const ButtonOptionContainer = styled.div`
  position: relative;
`;

const Title = styled.h2`
  margin: 2.4rem 0;
  padding: 0;
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 2.8rem;
  letter-spacing: -0.02rem;
`;

const Option = styled.div<{ $buttonOption?: boolean; $selectedMenu: string }>`
  position: relative;
  display: ${({ $buttonOption, $selectedMenu }) =>
    $buttonOption === true && $selectedMenu !== 'all' ? 'block' : 'none'};
  position: absolute;
  top: 0;
  right: 0;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    position: static;
    margin: 0 0 2rem 0;
  }
`;

const Button = styled.button`
  margin: 0 1.2rem 0 0;
  padding: 0 0 0 2.2rem;
  border: none;
  background-color: var(--white);
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.6rem;
  color: var(--gray60);
  cursor: pointer;

  &:first-child {
    background: url('/image/btn-share.png') no-repeat left center;
  }

  &:nth-child(2) {
    background: url('/image/btn-pen.png') no-repeat left center;
  }

  &:last-child {
    margin: 0;
    background: url('/image/btn-delete.png') no-repeat left center;
  }
`;
