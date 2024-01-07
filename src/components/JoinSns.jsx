import styled from 'styled-components';
import google from '../assets/ico-google.png';
import kakao from '../assets/ico-kakao.png';
import { Link } from 'react-router-dom';

const SnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3.2rem 0 0;
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  line-height: 1.6rem;
  border: 1px solid var(--gray20);
  background-color: var(--gray10);
`;

const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: var(--gray100);
`;

const SnsList = styled.div`
  ul {
    overflow: hidden;
    list-style-type: none;

    li {
      float: left;

      a {
        display: block;
        width: 4.2rem;
        height: 4.2rem;
      }
    }

    li + li {
      margin: 0 0 0 1.6rem;
    }
  }
`;

function JoinSns() {
  return (
    <SnsContainer>
      <Text>다른 방식으로 가입하기</Text>
      <SnsList>
        <ul>
          <li>
            <Link to="https://www.google.com/">
              <img src={google} alt="구글" />
            </Link>
          </li>
          <li>
            <Link to="https://www.kakaocorp.com/page/">
              <img src={kakao} alt="카카오톡" />
            </Link>
          </li>
        </ul>
      </SnsList>
    </SnsContainer>
  );
}

export default JoinSns;
