import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PAGE_CONTENT } from '@/constant'

export default function JoinLink() {
  const { pathname } = useRouter();
  const isMember = pathname === '/signup' ? PAGE_CONTENT.signup?.text : PAGE_CONTENT.signin?.text;
  const link = pathname === '/signup' ? PAGE_CONTENT.signup?.linkText : PAGE_CONTENT.signin?.linkText;
  const path = pathname === '/signup' ? PAGE_CONTENT.signup?.path : PAGE_CONTENT.signin?.path;

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
          {isMember}
        </p>
        <Link href={path}>
          {link}
        </Link>
      </SignLink>
    </>
  );
}

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