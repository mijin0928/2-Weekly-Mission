import styled from 'styled-components';
import { useRouter } from 'next/router';

interface UserButtonProps {
  handleClickLogin: () => void;
  handleClickEmailCheck: () => void;
  handleFocusoutEmpty: () => void;
}

const ButtonContainer = styled.div`
  margin: 3rem 0 0;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 1.6rem 2rem;
  border: 0;
  border-radius: 0.8rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.1rem;
  cursor: pointer;
  color: var(--gray-f5f5);
  background: linear-gradient(90.99deg, #6d6afe 0.12%, #6ae3fe 101.84%);
`;

export default function UserButton({ handleClickLogin, handleClickEmailCheck, handleFocusoutEmpty }: UserButtonProps) {
  const { pathname } = useRouter();

  const handleButtonClick = () => {
    if(pathname === '/signup'){
      handleClickEmailCheck();
    }else{
      handleClickLogin();
    }

    handleFocusoutEmpty();
  }

  return (
    <ButtonContainer>
      <Button type="button" onClick={handleButtonClick}>{pathname === '/signup' ? '회원가입' : '로그인'}</Button>
    </ButtonContainer>
  );
}


