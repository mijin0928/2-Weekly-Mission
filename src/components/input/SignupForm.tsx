import instance from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import UserButton from '@/src/components/userButton/UserButton';
import useToggle from '@/src/hook/useToggle';
import {
  InputContainer,
  InputBox,
  Label,
  Input,
  Messages,
  PassWord,
  EyeImg,
} from '@/src/components/input/SignStyle';

interface Inputvalue {
  email: string;
  password: string;
  passwordCheck?: string;
}

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Inputvalue>({ mode: 'onBlur' });

  const [togglePassword, setTogglePassword] = useToggle(false);
  const router = useRouter();

  const USER_INFO = {
    email: watch('email'),
    password: watch('password'),
  };

  const inputType = togglePassword ? 'text' : 'password';
  const imgType = togglePassword
    ? '/image/ico-eye-on.svg'
    : '/image/ico-eye-off.svg';

  async function signUp() {
    const response = await instance.post('/auth/sign-up', USER_INFO);
    return response;
  }

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      router.push('/signin');
    },
  });

  const onSubmit = async () => {
    mutate();
  };

  async function checkEmail() {
    const response = instance.post('/users/check-email', {
      email: USER_INFO.email,
    });
    return response;
  }

  const handleCheckEmail = async () => {
    await trigger('email');

    try {
      if (!errors.email && USER_INFO.email) {
        await checkEmail();
      }
    } catch (error) {
      setError('email', { message: '이미 사용중인 이메일입니다.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            onBlur={handleCheckEmail}
          />
          {errors.email && <Messages>{errors.email.message}</Messages>}
        </InputBox>

        <InputBox>
          <Label htmlFor="password">비밀번호</Label>
          <PassWord>
            <Input
              type={inputType}
              id="password"
              className={
                errors.password && errors.password.message ? 'active' : ''
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
              src={imgType}
              alt={togglePassword ? '비밀번호 표시' : '비밀번호 숨기기'}
              onClick={setTogglePassword as MouseEventHandler}
            />
          </PassWord>
          {errors.password && <Messages>{errors.password.message}</Messages>}
        </InputBox>
        <InputBox>
          <Label htmlFor="passwordCheck">비밀번호 확인</Label>
          <PassWord>
            <Input
              type={inputType}
              id="passwordCheck"
              className={errors.passwordCheck ? 'active' : ''}
              placeholder="비밀번호와 일치하는 값을 입력해 주세요"
              {...register('passwordCheck', {
                validate: {
                  check: (val) => {
                    if (USER_INFO.password !== val) {
                      return '비밀번호가 일치하지 않습니다.';
                    }
                  },
                },
              })}
              name="passwordCheck"
            />
            <EyeImg
              src={imgType}
              alt={togglePassword ? '비밀번호 표시' : '비밀번호 숨기기'}
              onClick={setTogglePassword as MouseEventHandler}
            />
          </PassWord>
          {errors.passwordCheck && (
            <Messages>{errors.passwordCheck?.message}</Messages>
          )}
        </InputBox>
      </InputContainer>
      <UserButton />
    </form>
  );
}
