import { useState } from 'react';

export default function useToggle(initialState: boolean) {
  const [togglePassword, setTogglePassword] = useState<boolean>(initialState);

  const handleClickPassword = () => setTogglePassword((prevValues) => !prevValues);

  return [togglePassword, handleClickPassword];
}


