import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { SNS_INFO } from '@/constant';

function SnsList() {
  const sns = SNS_INFO.map((sns) => (
    <li key={sns.id}>
      <Link href="/" target="_blank" rel="noopener noreferrer">
        <Image
          src={sns.src}
          width={18}
          height={18}
          alt={`${sns.alt} 홈페이지로 연결된 ${sns.alt} 로고`}
        />
      </Link>
    </li>
  ));
  return sns;
}

export default function Footer() {
  return (
    <FooterContainer>
      <Copyright>©codeit - 2023</Copyright>
      <div>
        <Privery>
          <Link href="/">Privacy Policy</Link>
        </Privery>
        <Faq>
          <Link href="/">FAQ</Link>
        </Faq>
      </div>
      <div>
        <Sns>
          <SnsList />
        </Sns>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3.2rem 10.4rem 10.8rem 10.4rem;
  background-color: var(--black);

  @media screen and (min-width: 375px) and (max-width: 768px) {
    position: relative;
    padding: 3.2rem 3.2rem 10.8rem 3.2rem;
  }
`;

const Copyright = styled.span`
  color: var(--gray-6767);
  font-family: Arial;
  font-size: 1.6rem;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    position: absolute;
    bottom: 3.2rem;
  }
`;

const Privery = styled.div`
  float: left;

  a {
    font-size: 1.6rem;
    color: var(--gray-6767);
  }
`;

const Faq = styled(Privery)`
  a {
    margin: 0 0 0 3rem;
  }
`;

const Sns = styled.ul`
  display: flex;
  gap: 1.2rem;

  li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;