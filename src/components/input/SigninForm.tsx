import instance from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import UserButton from '@/src/components/userButton/UserButton';
import useToggle from '@/src/hook/useToggle';
import { MouseEventHandler } from 'react';
import {
  InputContainer,
  InputBox,
  Label,
  Input,
  Messages,
  PassWord,
  EyeImg,
} from '@/src/components/input/SignStyle';
import { useRouter } from 'next/router';
interface Inputvalue {
  email: string;
  password: string;
  passwordCheck?: string;
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
  const router = useRouter();
  const queryClient = useQueryClient();

  const USER_INFO = {
    email: watch('email'),
    password: watch('password'),
  };

  async function signIn() {
    const response = await instance.post('/auth/sign-in', USER_INFO);
    return response.data.accessToken;
  }

  const { mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/auth/sign-in'] });
      localStorage.setItem('accessToken', data);
      router.push('/folder');
    },
    onError: () => {
      setError('email', { message: '이메일을 확인해주세요' });
      setError('password', { message: '비밀번호를 확인해주세요' });
    },
  });

  const onSubmit = async () => {
    mutate();
  };

  return (
    <>
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
            />
            {errors.email && <Messages>{errors.email.message}</Messages>}
          </InputBox>

          <InputBox>
            <Label htmlFor="password">비밀번호</Label>
            <PassWord>
              <Input
                type={togglePassword ? 'text' : 'password'}
                id="password"
                className={
                  errors.password && errors.password.message ? 'active' : ''
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
            {errors.password && <Messages>{errors.password.message}</Messages>}
          </InputBox>
        </InputContainer>
        <UserButton />
      </form>
    </>
  );
}
