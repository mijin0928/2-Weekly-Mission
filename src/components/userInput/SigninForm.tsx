import { BASE_URL } from '@/constant';
import { useForm } from 'react-hook-form';
import UserButton from '@/src/components/userButton/UserButton';
import useToggle from '@/src/hook/useToggle';
import { MouseEventHandler } from 'react';
import { Inputvalue, InputError } from '@/src/components/userInput/SignType';
import {
  InputContainer,
  InputBox,
  Label,
  Input,
  Messages,
  PassWord,
  EyeImg,
} from '@/src/components/userInput/SignStyle';
import { NextRouter, useRouter } from 'next/router';

async function onSubmit(USER_INFO: Inputvalue, setError: InputError, router: NextRouter) {
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
    if (localStorage.getItem('accessToken')) {
      router.push('/folder');
    }
    
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
    watch,
  } = useForm<Inputvalue>({ mode: 'onBlur' });

  const [togglePassword, setTogglePassword] = useToggle(false);
  
  const USER_INFO = {
    email: watch('email'),
    password: watch('password'),
  };

  const router = useRouter();

  return (
    <>
      <form onSubmit={handleSubmit(() => onSubmit(USER_INFO, setError, router))}>
        <InputContainer>
          <InputBox>
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              id="email"
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
            <Label htmlFor="password">비밀번호</Label>
            <PassWord>
              <Input
                type={togglePassword ? 'text' : 'password'}
                id="password"
                className={
                  errors.password && errors.password?.message ? 'active' : ''
                }
                placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
                    message:
                      '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요',
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
                onClick={setTogglePassword as MouseEventHandler}
              />
            </PassWord>
            {errors.password && <Messages>{errors.password?.message}</Messages>}
          </InputBox>
        </InputContainer>
        <UserButton />
      </form>
    </>
  );
}
