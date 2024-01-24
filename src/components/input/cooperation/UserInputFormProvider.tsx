import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import input, { FormValues } from '@/src/components/input/cooperation/input';

interface inputListProps {
  onSubmit: SubmitHandler<FormValues>;
}

export default function inputFormProvider() {
  const methods = useForm<FormValues>({ mode: 'onBlur' });
  const handleSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <inputList onSubmit={handleSubmit} />
    </FormProvider>
  );
}

function inputList({ onSubmit }: inputListProps) {
  const methods = useForm<FormValues>({ mode: 'onBlur' });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <input
        label="이메일"
        id="email"
        type="email"
        placeholder="이메일을 입력해주세요."
        validation={{
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/,
            message: '올바른 이메일 주소가 아닙니다.',
          },
        }}
      />
      <input
        label="비밀번호"
        id="password"
        type="password"
        placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
        validation={{
          required: '비밀번호를 입력해주세요.',
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
            message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
          },
        }}
      />
      <input
        label="비밀번호 확인"
        id="doubleCheckPassword"
        type="password"
        placeholder="비밀번호와 일치하는 값을 입력해 주세요."
        validation={{ required: '비밀번호를 입력해주세요.' }}
      />
    </form>
  );
}
