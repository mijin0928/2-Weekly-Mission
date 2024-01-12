import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

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

export default function JoinLink() {
  const { pathname } = useRouter();
  return (
    <>
      <Logo>
        <Link href="/">
          <Image
            src="/image/logo.svg"
            width={210}
            height={38}
            alt="Linkbrary 로고"
          />
          <span>Linkbrary</span>
        </Link>
      </Logo>

      <SignLink>
        <p>
          {pathname === '/signup' ? '이미 회원이신가요?' : '회원이 아니신가요?'}
        </p>
        <Link href={pathname === '/signup' ? '/signin' : '/signup'}>
          {pathname === '/signup' ? '로그인 하기' : '회원가입 하기'}
        </Link>
      </SignLink>
    </>
  );
}
