import { correct, errorMessage, emptyInput, errorPrint } from "./utils.js";

const input = document.querySelectorAll('.input');
const eye = document.querySelectorAll('.eye');
const pwInput = document.getElementById('signin-password');
const emailInput = document.getElementById('signin-email');
const btnLogin = document.querySelector('.btn-login');

// 로그인 버튼 클릭 시 페이지 이동
function login(e){
  e.preventDefault();

  const { email, password } = correct.userInfo;

  if(emailInput.value !== '' && pwInput.value !== ''){
    if(emailInput.value === email && pwInput.value === password) {
      location.href = './folder.html';
    }else{
      emailInput.classList.add('active');
      pwInput.classList.add('active');
      errorPrint(emailInput, errorMessage.check);
      errorPrint(pwInput, errorMessage.check);
    }
  }else{
    emailInput.classList.add('active');
    pwInput.classList.add('active');
    errorPrint(emailInput, errorMessage.empty);
    errorPrint(pwInput, errorMessage.empty);
  }
}

// 눈 아이콘 클릭 시 이미지 및 타입 변경
function eyeToggle(e){
  e.preventDefault();

  if(e.target.src.indexOf('off') > -1){
    e.target.src = './images/ico-eye-on.svg';
    pwInput.type = 'password';
  }else{
    e.target.src = './images/ico-eye-off.svg';
    pwInput.type = 'text';
  }
}

btnLogin.addEventListener('click', login);
eye.forEach((el) => el.addEventListener('click', eyeToggle))
input.forEach((el) => {el.addEventListener('focusout', emptyInput)})


