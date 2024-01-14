const BASE_URL = 'https://bootcamp-api.codeit.kr/api';

const PAGE_CONTENT = {
  signin: {
    button: '로그인',
    text: '회원이 아니신가요?',
    path: '/signin',
    link: '로그인 하기',
    email: 'signin-email',
    password: 'signin-password'
  },
  signup: {
    button: '회원가입',
    text: '이미 회원이신가요?',
    path: '/signup',
    link: '회원가입 하기',
    email: 'signup-email',
    password: 'signup-password'
  },
};

export { BASE_URL, PAGE_CONTENT }
