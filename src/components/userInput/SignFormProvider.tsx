import { useForm, FormProvider } from 'react-hook-form';
import SigninForm from '@/src/components/userInput/SigninForm';
import SignupForm from '@/src/components/userInput/SignupForm';
import { onSubmit } from '@/src/components/userInput/SigninForm';
import UserButton from '../userButton/UserButton';

export interface InputValue {
  email: string;
  password: string;
  passwordCheck?: string;
}

export type Error = (name: 'email' | 'password', message: {}) => void;

export default function SignFormProvider() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<InputValue>({ mode: 'onBlur' });
  const methods = useForm<InputValue>({ mode: 'onBlur' });
  const USER_INFO = {
    email: getValues('email'),
    password: getValues('password'),
  };
  return <FormProvider {...methods}><SignForm /></FormProvider>;
}

function SignForm() {
  return <SigninForm />;
}
