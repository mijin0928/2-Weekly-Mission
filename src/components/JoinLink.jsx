import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { useLocation, Link } from 'react-router-dom';

const Logo = styled.div`
  text-align: center;

  img {
    width: 21rem;
  }

  span {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    clip-path: rect(0 0 0 0);
  }
`;

const SignLink = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin: 1.6rem 0 0;

  p {
    font-size: 1.6rem;
  }

  a {
    color: var(--primary);
    font-weight: 600;
    line-height: 1.9rem;
    border-bottom: 1px solid var(--primary);
    font-size: 1.6rem;
  }
`;

function JoinLink() {
  const { pathname } = useLocation();
  return (
    <>
      <Logo>
        <Link to="/">
          <img src={logo} alt="Linkbrary 로고" />
          <span>Linkbrary</span>
        </Link>
      </Logo>

      <SignLink>
        <p>
          {pathname === '/signup' ? '이미 회원이신가요?' : '회원이 아니신가요?'}
        </p>
        <Link to="/">
          {pathname === '/signup' ? '로그인 하기' : '회원가입 하기'}
        </Link>
      </SignLink>
    </>
  );
}

export default JoinLink;
