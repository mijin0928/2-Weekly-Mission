import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAsync from '../hook/useAsync';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: ${({ $position }) => ($position || 'fixed')};
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 9.4rem;
  padding: 0 20rem;
  background-color: var(--bg);

  @media screen and (max-width: 1124px) {
    padding: 0 3.2rem;
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    padding: 0 3.2rem;
    height: 6.3rem;
  }
`;

const Logo = styled.h1`
  display: block;
`;

const LogoImg = styled.img`
  @media screen and (min-width: 375px) and (max-width: 768px) {
    width: 8.8rem;
  }
`;

const Profile = styled.div`
  a {
    display: flex;
    align-items: center;
    padding: 0 0 0 0.6rem;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: var(--gray100);
  }
`;

const ProfileImg = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 100%;
`;

const ProfileEmail = styled.p`
  padding: 0 0 0 0.6rem;
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: var(--gray100);

  @media screen and (min-width: 375px) and (max-width: 768px) {
    display: none;
  }
`;
const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.8rem;
  height: 5.4rem;
  cursor: pointer;
  background-image: linear-gradient(135deg, #6d6afe 0%, #6ae3fe 100%);
  border-radius: 0.8rem;
  color: var(--gray-f5f5);
  font-size: 1.8rem;
  font-weight: 600;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    width: 8rem;
    height: 3.7rem;
    font-size: 2.4rem;
  }
`;

function Nav() {
  const [profileImg, setProfileImg] = useState(null);
  const [profileEmail, setProfileEmail] = useState('');
  const [position, setPosition] = useState('');
  const { pathname } = useLocation();
  const [getProfile] = useAsync('/users', '/1', '', '');
  const [getProfileSample] = useAsync('/sample/user', '', '', '');
  
  const handleLoadProfile = async () => {
    const { email, profileImageSource } = await getProfileSample();
    const { data } = await getProfile();

    if(pathname === '/shared'){
      setProfileImg(profileImageSource);
      setProfileEmail(email);
    }else{
      setProfileImg(data[0]?.image_source);
      setProfileEmail(data[0]?.email);
      setPosition('static');
    }
  };

  useEffect(() => {
    handleLoadProfile();
  }, []);

  return (
    <NavContainer $position={position}>
      <Logo>
        <Link to="/">
          <LogoImg src={logo} alt="linkbrary 로고" />
        </Link>
      </Logo>
      {profileImg ? (
        <Profile>
          <Link to="/">
            <ProfileImg
              src={profileImg}
              alt="프로필 이미지"
            />
            <ProfileEmail>{profileEmail}</ProfileEmail>
          </Link>
        </Profile>
      ) : (
        <Link to="/">
          <Login>로그인</Login>
        </Link>
      )}
    </NavContainer>
  );
}

export default Nav;
