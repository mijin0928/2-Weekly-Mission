const BASE_URL = 'https://bootcamp-api.codeit.kr/api';

const PAGE_CONTENT = {
  signin: {
    button: '로그인',
    text: '회원이 아니신가요?',
    path: '/signin',
    linkText: '로그인 하기',
    email: 'signin-email',
    password: 'signin-password'
  },
  signup: {
    button: '회원가입',
    text: '이미 회원이신가요?',
    path: '/signup',
    linkText: '회원가입 하기',
    email: 'signup-email',
    password: 'signup-password'
  },
};

const BUTTON = [
  {
    id: 'linkRemove',
    name: '삭제하기',
  },
  {
    id: 'folderAdd',
    name: '폴더에 추가',
  },
];


export { BASE_URL, PAGE_CONTENT, BUTTON }
