const form = document.querySelector('form');
const formBox = document.querySelectorAll('.form-box');
const emailPattern = /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
const userEmail = 'test@codeit.com';
const emailInput = document.getElementById('signin-email');
const pwInput = document.getElementById('signin-password');
const userPw = 'codeit101';
const emailInputUp = document.getElementById('signup-email');
const pwInputUp = document.getElementById('signup-password');
const userPwCheck = document.getElementById('signup-check-password');
const btnJoin = document.querySelector('.btn-box .btn-join');
const eyeOn = document.querySelectorAll('.eye-on');

// 이메일, 비밀번호 유효성 검사
formBox.forEach((el) => {
  el.addEventListener('focusout', (e)=> {
    if(e.target.value === ''){
      e.currentTarget.classList.add('active');
      
      el.classList.contains('email') ?  e.currentTarget.lastElementChild.textContent = '이메일을 입력하세요' : e.currentTarget.lastElementChild.textContent = '비밀번호를 입력하세요';
    }else{
      if(el.classList.contains('pw')){
        e.currentTarget.classList.remove('active');
        e.currentTarget.lastElementChild.textContent = '';

        validate(emailPattern, pwPattern);
      }

      function validate(emailPattern, pwPattern){
        if(el.classList.contains('email')){
          if(emailPattern.test(e.target.value) === false){
            e.currentTarget.classList.add('active');
            e.currentTarget.lastElementChild.textContent = '올바른 이메일 주소가 아닙니다.';
          }
        }else{
          if(pwPattern.test(e.target.value) === false){
            e.currentTarget.classList.add('active');
            e.currentTarget.lastElementChild.textContent = '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.';
          }
        }
      }
    }
  });
});

// 회원가입 버튼 클릭 시 가입된 이메일 존재 여부 확인 후 페이지 이동
function join(e){
  e.preventDefault();

  formBox.forEach((el) => {
    if(!el.classList.contains('active')){
      if(emailInputUp.value === userEmail){
        if(el.classList.contains('email')){
          el.classList.add('active');
          el.lastElementChild.textContent = '이미 사용 중인 이메일입니다.';
        }else{
          el.classList.remove('active');
          el.lastElementChild.textContent = '';
        }
      }else{
        form.submit();
      } 
    }
  })
}
btnJoin.addEventListener('click', join);

// 비밀번호 input과 비밀번호 확인 input의 값이 다른 경우
function pwCheck(e){
  if(pwInputUp.value !== userPwCheck.value){
    e.target.parentElement.parentElement.classList.add('active');
    e.target.parentElement.parentElement.lastElementChild.textContent = '비밀번호가 일치하지 않아요.';
  }
}
userPwCheck.addEventListener('focusout', pwCheck);

// 눈 아이콘 클릭 시 비밀번호 보이게 하기
function eyeOff(e){
  e.preventDefault();
  
  e.target.parentElement.classList.toggle('active');
  if(e.target.parentElement.classList.contains('active')){
    e.target.previousElementSibling.setAttribute('type', 'password');
    e.target.setAttribute('src', './images/ico-eye-off.svg');
  }else{
    e.target.previousElementSibling.setAttribute('type', 'text');
    e.target.setAttribute('src', './images/ico-eye-on.svg');
  }
}
eyeOn.forEach((eye) => {eye.addEventListener('click', eyeOff)})













