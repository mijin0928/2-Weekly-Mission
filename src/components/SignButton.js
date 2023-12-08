import styled from 'styled-components';

const BtnBox = styled.div`
  margin: 3rem 0 0;

  button {
    display: block;
    width: 100%;
    padding: 1.6rem 2rem;
    border: 0;
    border-radius: 0.8rem;
    text-align: center;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 2.1rem;
    cursor: pointer;
    color: var(--btn-color);
    background: linear-gradient(90.99deg, #6d6afe 0.12%, #6ae3fe 101.84%);
  }
`;

function SignButton() {
  return (
    <BtnBox>
      <button type="button">회원가입</button>
    </BtnBox>
  );
}

export default SignButton;
