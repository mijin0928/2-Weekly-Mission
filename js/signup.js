import { correct, errorMessage, emptyInput, errorPrint, pwCheckInput } from "./utils.js";

const input = document.querySelectorAll('.input');
const pwInput = document.getElementById('signup-password');
const emailInput = document.getElementById('signup-email');
const eye = document.querySelectorAll('.eye');
const btnJoin = document.querySelector('.btn-box .btn-join');

// 회원가입 버튼 클릭 시 페이지 이동
function join(){
  const { email } = correct.userInfo;
  
  if(emailInput.value !== email){
    if(pwInput.value !== '' && pwCheckInput.value !== '') location.href = './folder.html';
  }else{
    emailInput.classList.add('active');
    errorPrint(emailInput, errorMessage.incorrect);
  }

  if(emailInput.value === '' && pwInput.value === '') {
    emailInput.classList.add('active');
    pwInput.classList.add('active');
    errorPrint(emailInput, errorMessage.empty);
    errorPrint(pwInput, errorMessage.empty);
  }
}

// 비밀번호, 비밀번호 확인 일치여부
function pwCheck(){
  if(pwInput.value !== '' && pwCheckInput.value !== ''){
    if(pwInput.value !== pwCheckInput.value){
      pwCheckInput.classList.add('active');
      errorPrint(pwCheckInput, errorMessage.incorrect)
    }
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

// 이메일 중복체크 api
async function emailCheck(){
  if(emailInput.value === '') return;

  try{
    const data = {
      email: emailInput.value,
    }

    const response = await fetch('https://bootcamp-api.codeit.kr/api/check-email',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if(response.status === 200){
      const { email } = data;
      join(email);
    }
  }catch(error){
    console.log(error);
  }  
}

// 회원가입 api
async function userJoin(emailInput, pwInput, pwCheckInput){
  if(emailInput.value === '' && pwInput.value === '') return;
  
  try{
    const data = {
      email: emailInput.value,
      password: pwInput.value,
      passwordCheck: pwCheckInput,
    }

    const response = await fetch('https://bootcamp-api.codeit.kr/api/sign-up',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    const { email, password } = data;
    const takeToken = await response.json();
    const token = await takeToken.data.accessToken;
    localStorage.setItem('accessToken', token);

    if(localStorage.getItem('accessToken')) join(email, password);
  }catch(error){
    console.log(error);
  }  
}

btnJoin.addEventListener('click', (e) => {
  e.preventDefault();
  join();
  emailCheck(emailInput);
  userJoin(emailInput, pwInput);
});
eye.forEach((el) => el.addEventListener('click', eyeToggle))
input.forEach((el) => {el.addEventListener('focusout', ({ target }) => {
  emptyInput({ target });
  pwCheck();  
})})

