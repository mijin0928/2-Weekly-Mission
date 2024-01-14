import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import UserButton from '@/src/components/userButton/UserButton';
import { useForm } from 'react-hook-form';
import { BASE_URL, PAGE_CONTENT } from '@/constant';

interface InputValue {
  email: string;
  password: string;
  passwordCheck?: string;
}

interface Data {
  url: string;
  newError: string;
  emailErrorMessage?: string;
  passwordErrorMessage?: string;
  checkEmail?: boolean;
}

export default function UserInput() {
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<InputValue>({ mode: 'onBlur' });
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [togglePasswordCheck, setTogglePasswordCheck] =
    useState<boolean>(false);
  const { pathname } = useRouter();

  const path = pathname === '/signup' ? true : false;
  const inputId =
    pathname === '/signup'
      ? PAGE_CONTENT.signup?.email
      : PAGE_CONTENT.signin?.email;
  const inputPassword =
    pathname === '/signup'
      ? PAGE_CONTENT.signup?.password
      : PAGE_CONTENT.signin?.password;

  const handleClickPassword = () => setTogglePassword(!togglePassword);

  const handleClickPasswordCheck = () =>
    setTogglePasswordCheck(!togglePasswordCheck);

  const USER_INFO: InputValue = {
    email: getValues('email'),
    password: getValues('password'),
  };

  const handleSubmitData = async ({
    url,
    newError,
    emailErrorMessage,
    passwordErrorMessage,
    checkEmail = false,
  }: Data) => {
    try {
      const requestBody = checkEmail
        ? { email: getValues('email') }
        : USER_INFO;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!checkEmail) {
        const { data } = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        if (localStorage.getItem('accessToken'))
          window.location.href = '/folder';
      }

      if (!response.ok) throw new Error(newError);
    } catch {
      setError('email', { message: emailErrorMessage });
      setError('password', { message: passwordErrorMessage });
    }
  };

  const handleSubmitLogin = () => {
    handleSubmitData({
      url: `${BASE_URL}/sign-in`,
      newError: '로그인 정보가 일치하지 않습니다',
      emailErrorMessage: '이메일을 확인해주세요',
      passwordErrorMessage: '비밀번호를 확인해주세요',
    });
  };

  const handleSubmitJoin = () => {
    handleSubmitData({
      url: `${BASE_URL}/sign-up`,
      newError: '이미 가입된 회원입니다',
    });
  };

  const handleFocusoutCheckEmail = async () => {
    await trigger('email');

    if (!errors.email && getValues('email')) {
      handleSubmitData({
        url: `${BASE_URL}/check-email`,
        newError: '중복된 이메일입니다',
        emailErrorMessage: '이미 사용중인 이메일입니다',
        checkEmail: true,
      });
    }
  };

  const handleSubmitForm = () =>
    path ? handleSubmitJoin() : handleSubmitLogin();

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <InputContainer>
        <InputBox>
          <Label htmlFor={inputId}>이메일</Label>
          <Input
            type="email"
            id={inputId}
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
            onBlur={handleFocusoutCheckEmail}
          />
          {errors.email && <Messages>{errors.email?.message}</Messages>}
        </InputBox>

        <InputBox>
          <Label htmlFor={inputPassword}>비밀번호</Label>
          <PassWord>
            <Input
              type={togglePassword ? 'text' : 'password'}
              id={inputPassword}
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
        {path && (
          <InputBox>
            <Label htmlFor="signup-check-password">비밀번호 확인</Label>
            <PassWord>
              <Input
                type={togglePassword ? 'text' : 'password'}
                id="signup-check-password"
                className={errors.passwordCheck ? 'active' : ''}
                placeholder="비밀번호와 일치하는 값을 입력해 주세요"
                {...register('passwordCheck', {
                  validate: {
                    check: (val) => {
                      if (getValues('password') !== val) {
                        return '비밀번호가 일치하지 않습니다.';
                      }
                    },
                  },
                })}
                name="passwordCheck"
              />
              <EyeImg
                src={
                  togglePasswordCheck
                    ? '/image/ico-eye-on.svg'
                    : '/image/ico-eye-off.svg'
                }
                alt={togglePasswordCheck ? '비밀번호 표시' : '비밀번호 숨기기'}
                onClick={handleClickPasswordCheck}
              />
            </PassWord>
            {errors.passwordCheck && (
              <Messages>{errors.passwordCheck?.message}</Messages>
            )}
          </InputBox>
        )}
      </InputContainer>
      <UserButton />
    </form>
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
