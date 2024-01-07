import { Helmet } from 'react-helmet';
import JoinSns from '../components/JoinSns';
import JoinLink from '../components/JoinLink';
import styled from 'styled-components';
import UserInput from '../components/UserInput';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--bg);
`;

const Wrap = styled.div`
  width: 40rem;
`;

function SigninPage() {
  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <Container>
        <Wrap>
          <JoinLink />
          <UserInput />
          <JoinSns />
        </Wrap>
      </Container>
    </>
  );
}

export default SigninPage;
