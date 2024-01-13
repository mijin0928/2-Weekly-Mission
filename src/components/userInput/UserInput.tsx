import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import UserButton from '@/src/components/userButton/UserButton';

interface InputValue {
  email: string;
  password: string;
  passwordCheck?: string;
}

interface Validation {
  email: RegExp;
  password: RegExp;
}

export default function UserInput() {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [togglePasswordCheck, setTogglePasswordCheck] =
    useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [errorPasswordCheck, setErrorPasswordCheck] = useState<string>('');
  const [inputValue, setInputValue] = useState<InputValue>({
    email: '',
    password: '',
    passwordCheck: '',
  });
  const VALIDATION: Validation = {
    email: /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/,
    password: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
  };
  const USER_INFO: InputValue = {
    email: inputValue.email,
    password: inputValue.password,
  };
  const BASE_URL = 'https://bootcamp-api.codeit.kr/api';
  const { pathname } = useRouter();

  const handleClickPassword = () => setTogglePassword(!togglePassword);

  const handleClickPasswordCheck = () =>
    setTogglePasswordCheck(!togglePasswordCheck);

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFocusoutEmail = () => {
    if (!inputValue.email) {
      setErrorEmail('이메일을 입력하세요');
    } else {
      !VALIDATION.email.test(inputValue.email)
        ? setErrorEmail('올바른 이메일 주소가 아닙니다')
        : setErrorEmail('');
    }
  };

  const handleFocusoutPassword = () => {
    if (!inputValue.password) {
      setErrorPassword('비밀번호를 입력하세요');
    } else {
      !VALIDATION.password.test(inputValue.password)
        ? setErrorPassword('비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요')
        : setErrorPassword('');
    }
  };

  const handleFocusoutEmpty = () => {
    if (!inputValue.email && !inputValue.password) {
      setErrorEmail('이메일을 입력하세요');
      setErrorPassword('비밀번호를 입력하세요');
    }
  };

  const handleFocusoutPasswordCheck = () => {
    inputValue.password !== inputValue.passwordCheck
      ? setErrorPasswordCheck('비밀번호가 일치하지 않습니다')
      : setErrorPasswordCheck('');
  };

  const handleClickLogin = async () => {
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
      if (!response.ok) throw new Error('로그인 정보가 일치하지 않습니다');
    } catch {
      setErrorEmail('이메일을 확인해주세요');
      setErrorPassword('비밀번호를 확인해주세요');
    }
  };

  const handleClickJoin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/sign-up`, {
        method: 'POST',
        body: JSON.stringify(USER_INFO),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { data } = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      if (localStorage.getItem('accessToken')) window.location.href = '/folder';
      if (!response.ok) throw new Error('이미 가입된 회원입니다');
    } catch {
      return;
    }
  };

  const handleFocusoutEmailCheck = async () => {
    try {
      const response = await fetch(`${BASE_URL}/check-email`, {
        method: 'POST',
        body: JSON.stringify({ email: USER_INFO.email }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('중복된 이메일입니다');
    } catch {
      setErrorEmail('이미 사용중인 이메일입니다');
    }
  };

  return (
    <InputContainer>
      <InputBox>
        <Label
          htmlFor={pathname === '/signup' ? 'signup-email' : 'signin-email'}
        >
          이메일
        </Label>
        <Input
          type="email"
          id={pathname === '/signup' ? 'signup-email' : 'signin-email'}
          name="email"
          value={inputValue.email}
          onChange={handleChangeInputValue}
          onBlur={() => {
            handleFocusoutEmail();
            pathname === '/signup' && handleFocusoutEmailCheck();
          }}
          className={errorEmail ? 'active' : ''}
          placeholder="이메일을 입력해주세요"
        />
        {errorEmail && <Messages>{errorEmail}</Messages>}
      </InputBox>

      <InputBox>
        <Label
          htmlFor={
            pathname === '/signup' ? 'signup-password' : 'signin-password'
          }
        >
          비밀번호
        </Label>
        <PassWord>
          <Input
            type={togglePassword ? 'text' : 'password'}
            id={
              pathname === '/signup'
                ? 'signup-password'
                : 'signin-emapasswordil'
            }
            name="password"
            value={inputValue.password}
            onChange={handleChangeInputValue}
            onBlur={handleFocusoutPassword}
            className={errorPassword ? 'active' : ''}
            placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
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
        {errorPassword && <Messages>{errorPassword}</Messages>}
      </InputBox>
      {pathname === '/signup' && (
        <InputBox>
          <Label htmlFor="signup-check-password">비밀번호 확인</Label>
          <PassWord>
            <Input
              type={togglePassword ? 'text' : 'password'}
              id="signup-check-password"
              name="passwordCheck"
              value={inputValue.passwordCheck}
              onChange={handleChangeInputValue}
              onBlur={handleFocusoutPasswordCheck}
              className={errorPasswordCheck ? 'active' : ''}
              placeholder="비밀번호와 일치하는 값을 입력해 주세요"
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
          {errorPasswordCheck && <Messages>{errorPasswordCheck}</Messages>}
        </InputBox>
      )}
      <UserButton
        handleClickLogin={handleClickLogin}
        handleClickJoin={handleClickJoin}
        handleFocusoutEmpty={handleFocusoutEmpty}
      />
    </InputContainer>
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
