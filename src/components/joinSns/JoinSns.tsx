import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

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

export default function JoinSns() {
  return (
    <SnsContainer>
      <Text>다른 방식으로 가입하기</Text>
      <SnsList>
        <ul>
          <li>
            <Link href="https://www.google.com/">
              <Image
                src="/image/ico-google.svg"
                width={42}
                height={42}
                alt="구글"
              />
            </Link>
          </li>
          <li>
            <Link href="https://www.kakaocorp.com/page/">
              <Image
                src="/image/ico-kakao.svg"
                width={42}
                height={42}
                alt="카카오톡"
              />
            </Link>
          </li>
        </ul>
      </SnsList>
    </SnsContainer>
  );
}
