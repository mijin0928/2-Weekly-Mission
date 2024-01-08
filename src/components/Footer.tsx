import styled from 'styled-components';
import facebook from '../assets/ico-facebook.png';
import twitter from '../assets/ico-twitter.png';
import youtube from '../assets/ico-youtube.png';
import instagram from '../assets/ico-instagram.png';
import { Link } from 'react-router-dom';

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

function SnsList() {
  const SNS_INFO = [
    {
      id: 'facebook',
      src: facebook,
      alt: 'facebook',
    },

    {
      id: 'twitter',
      src: twitter,
      alt: 'twitter',
    },

    {
      id: 'youtube',
      src: youtube,
      alt: 'youtube',
    },

    {
      id: 'instagram',
      src: instagram,
      alt: 'instagram',
    },
  ];

  const sns = SNS_INFO.map((sns) => (
    <li key={sns.id}>
      <Link to="/" target="_blank" rel="noopener noreferrer">
        <img
          src={sns.src}
          alt={`${sns.alt} 홈페이지로 연결된 ${sns.alt} 로고`}
        />
      </Link>
    </li>
  ));
  return sns;
}

function Footer() {
  return (
    <FooterContainer>
      <Copyright>©codeit - 2023</Copyright>
      <div>
        <Privery>
          <Link to="/">Privacy Policy</Link>
        </Privery>
        <Faq>
          <Link to="/">FAQ</Link>
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

export default Footer;
