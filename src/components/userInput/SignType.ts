export interface Inputvalue {
  email: string;
  password: string;
  passwordCheck?: string;
}

export type InputError = (name: 'email' | 'password', messages: {}) => void;