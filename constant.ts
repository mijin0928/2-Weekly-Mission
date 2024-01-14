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

const SNS_INFO = [
  {
    id: 'facebook',
    src: '/image/ico-facebook.png',
    alt: 'facebook',
  },

  {
    id: 'twitter',
    src: '/image/ico-twitter.png',
    alt: 'twitter',
  },

  {
    id: 'youtube',
    src: '/image/ico-youtube.png',
    alt: 'youtube',
  },

  {
    id: 'instagram',
    src: '/image/ico-instagram.png',
    alt: 'instagram',
  },
];

const BUTTON_OPTION = [
  {
    id: 'share',
    name: '공유',
  },
  {
    id: 'edit',
    name: '이름 변경',
  },
  {
    id: 'folderRemove',
    name: '삭제',
  },
];

export { BASE_URL, PAGE_CONTENT, BUTTON, SNS_INFO, BUTTON_OPTION }
