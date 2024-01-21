import { useState } from 'react';

export default function useToggle(initialState: boolean) {
  const [togglePassword, setTogglePassword] = useState<boolean>(initialState);

  const handleClickPassword = () => setTogglePassword(!togglePassword);

  return [togglePassword, handleClickPassword];
}


