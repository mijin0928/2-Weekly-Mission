import { Helmet } from 'react-helmet';
import UserInput from '../components/UserInput';
import JoinSns from '../components/JoinSns';
import JoinLink from '../components/JoinLink';
import styled from 'styled-components';

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

function SignupPage() {
  return (
    <>
      <Helmet>
        <title>회원가입</title>
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

export default SignupPage;
