import { useState } from 'react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import EyeOn from '@/public/image/ico-eye-on.svg';
import EyeOff from '@/public/image/ico-eye-off.svg';
import styled from 'styled-components';

export interface FormValues {
  email: string;
  password: string;
  doubleCheckPassword: string;
}

interface InputProps {
  label: '이메일' | '비밀번호' | '비밀번호 확인';
  id: 'email' | 'password' | 'doubleCheckPassword';
  type: 'email' | 'text' | 'password';
  placeholder:
    | '이메일을 입력해주세요.'
    | '영문, 숫자를 조합해 8자 이상 입력해 주세요.'
    | '비밀번호와 일치하는 값을 입력해 주세요.';
  validation: validation;
}

type validation = {
  required: '이메일을 입력해주세요.' | '비밀번호를 입력해주세요.';
  pattern?: {
    value: RegExp;
    message:
      | '올바른 이메일 주소가 아닙니다.'
      | '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.';
  };
  validate?: {
    check: (val: string) => string | undefined;
  };
};

export default function UserInputCommon({
  label,
  id,
  type,
  placeholder,
  validation,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [togglePasswordCheck, setTogglePasswordCheck] =
    useState<boolean>(false);

  const handleClickTogglePassword = () => setTogglePassword((prev) => !prev);

  const handleClickTogglePasswordCheck = () =>
    setTogglePasswordCheck((prev) => !prev);

  const source = togglePasswordCheck ? EyeOn : EyeOff;
  const isPassword = type === 'password' ? true : false;

  return (
    <InputContainer>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputWrapper hasError={!!errors[id]}>
        <InputValue
          id={id}
          type={togglePassword ? 'text' : type}
          placeholder={placeholder}
          {...register(id, validation)}
        />
        {isPassword && (
          <Button
            type="button"
            onClick={() => {
              handleClickTogglePassword();
              handleClickTogglePasswordCheck();
            }}
          >
            <Image
              src={source}
              alt="비밀번호 숨김 표시"
              width={16}
              height={16}
            />
          </Button>
        )}
      </InputWrapper>
      <ErrorMessage>{errors[id]?.message}</ErrorMessage>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
`;

const InputLabel = styled.label`
  margin-bottom: 0.6rem;
  color: var(--black);
  font-size: 1.4rem;
`;

const InputWrapper = styled.div<{ hasError?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.8rem 1.5rem;
  border-radius: 0.8rem;
  background: var(--white);
  outline: ${({ hasError }) =>
    hasError ? '1px solid var(--red)' : '1px solid var(--gray20)'};

  &:focus-within {
    outline: 1px solid var(--primary);
  }
`;

const InputValue = styled.input`
  border: none;
  outline: none;
  width: 94%;
  color: var(--gray100);
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const ErrorMessage = styled.small`
  width: 100%;
  height: 1.7rem;
  font-size: 1.4rem;
  color: var(--red);
`;
