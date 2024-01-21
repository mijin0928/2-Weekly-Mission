import Head from 'next/head';
import JoinSns from '@/src/components/joinSns/JoinSns';
import JoinLink from '@/src/components/joinLink/JoinLink';
import styled from 'styled-components';
import Signinform from '@/src/components/userInput/Signinform';

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

export default function SigninPage() {
  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <Container>
        <Wrap>
          <JoinLink />
          <Signinform />
          <JoinSns />
        </Wrap>
      </Container>
    </>
  );
}
