import { useState } from 'react';
import { BASE_URL } from '@/constant';
import { FormProvider, useForm } from 'react-hook-form';
import UserButton from '@/src/components/userButton/UserButton';
import styled from 'styled-components';
import { InputValue, Error } from '@/src/components/userInput/SignFormProvider';

export async function onSubmit(USER_INFO: InputValue, setError: Error) {
  try {
    const response = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      body: JSON.stringify(USER_INFO),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    if (localStorage.getItem('accessToken')) window.location.href = '/folder';

    if (!response.ok) throw new Error('로그인 정보가 일치하지 않습니다.');
  } catch {
    setError('email', { message: '이메일을 확인해주세요' });
    setError('password', { message: '비밀번호를 확인해주세요' });
  }
}

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<InputValue>({ mode: 'onBlur' });

  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const handleClickPassword = () => setTogglePassword(!togglePassword);

  const USER_INFO = {
    email: getValues('email'),
    password: getValues('password'),
  };

  return (
    <>
      <InputContainer>
        <InputBox>
          <Label htmlFor="">이메일</Label>
          <Input
            type="email"
            id=""
            className={errors.email ? 'active' : ''}
            placeholder="이메일을 입력해주세요"
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '올바른 이메일 주소가 아닙니다',
              },
            })}
            name="email"
          />
          {errors.email && <Messages>{errors.email?.message}</Messages>}
        </InputBox>

        <InputBox>
          <Label htmlFor="">비밀번호</Label>
          <PassWord>
            <Input
              type={togglePassword ? 'text' : 'password'}
              id=""
              className={
                errors.password && errors.password?.message ? 'active' : ''
              }
              placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
                  message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요',
                },
              })}
              name="password"
            />
            <EyeImg
              src={
                togglePassword
                  ? '/image/ico-eye-on.svg'
                  : '/image/ico-eye-off.svg'
              }
              alt={togglePassword ? '비밀번호 표시' : '비밀번호 숨기기'}
              onClick={handleClickPassword}
            />
          </PassWord>
          {errors.password && <Messages>{errors.password?.message}</Messages>}
        </InputBox>
      </InputContainer>
      {/* <UserButton /> */}
    </>
  );
}

const InputContainer = styled.div`
  margin: 3rem 0 0;
`;

const InputBox = styled.div`
  margin: 2.4rem 0 0;
`;

const Label = styled.label`
  display: block;
  margin: 0 0 1.2rem 0;
  font-size: 1.4rem;
  line-height: 1.6rem;
`;

const Input = styled.input`
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

const Messages = styled.p`
  margin: 0.6rem 0 0;
  color: var(--red);
  font-size: 1.4rem;
  line-height: 1.6rem;
`;

const PassWord = styled.div`
  position: relative;
`;

const EyeImg = styled.img`
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
  cursor: pointer;
`;
