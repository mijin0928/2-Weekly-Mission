import styled from 'styled-components';

export const InputContainer = styled.div`
  margin: 3rem 0 0;
`;

export const InputBox = styled.div`
  margin: 2.4rem 0 0;
`;

export const Label = styled.label`
  display: block;
  margin: 0 0 1.2rem 0;
  font-size: 1.4rem;
  line-height: 1.6rem;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  padding: 1.8rem 1.5rem;
  font-size: 1.6rem;
  color: var(--gray100);
  border-radius: 0.8rem;
  border: 1px solid var(--gray20);
  background-color: var(--white);

  &:focus {
    border: 1px solid var(--primary);
  }

  &.active {
    border: 1px solid var(--red);
  }
`;

export const Messages = styled.p`
  margin: 0.6rem 0 0;
  color: var(--red);
  font-size: 1.4rem;
  line-height: 1.6rem;
`;

export const PassWord = styled.div`
  position: relative;
`;

export const EyeImg = styled.img`
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
  cursor: pointer;
`;
