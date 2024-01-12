import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #f0f6ff;
    --primary: #6d6afe; 
    --red: #ff5b56; 
    --black: #111322;
    --black-000: #000;
    --black-333: #333;
    --white: #fff;
    --gray10: #e7effb;
    --gray20: #ccd5e3;
    --gray60: #9fa6b2;
    --gray100: #373740;
    --gray-666: #666;
    --gray-6767: #676767;
    --gray-f5f5: #f5f5f5;
    --light-gray100: #333236;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: 'pretendard';
  }

  a {
    text-decoration: none;
  }

  header {
    background-color: var(--bg);
  }

  main {
    margin: 4rem 0 10rem 0;
    padding: 0 19rem;

    @media screen and (max-width: 1124px) {
      padding: 0 3.2rem;
    }
  }
`;

export default GlobalStyle;
