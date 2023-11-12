const form = document.querySelector('form');
const formBox = document.querySelectorAll('.form-box');
const emailPattern = /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
const userEmail = 'test@codeit.com';
const emailInput = document.getElementById('signin-email');
const pwInput = document.getElementById('signin-password');
const userPw = 'codeit101';
const btnLogin = document.querySelector('.btn-box .btn-login');
const eyeOff = document.querySelector('.eye-off');

// 이메일, 비밀번호 유효성 검사
formBox.forEach((el) => {
  el.addEventListener('focusout', (e)=> {
    if(e.target.value === ''){
      e.currentTarget.classList.add('active');
      
      el.classList.contains('email') ?  e.currentTarget.lastElementChild.textContent = '이메일을 입력하세요' : e.currentTarget.lastElementChild.textContent = '비밀번호를 입력하세요';
    }else{
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
  });
});

// 로그인 버튼 클릭 시 이메일, 비밀번호 일치여부 확인 후 페이지 이동
function login(e){  
  e.preventDefault();

  formBox.forEach((el) => {
    if(!el.classList.contains('active')){
      if(emailInput.value === userEmail && pwInput.value === userPw){
        form.submit();
      }else{
        formBox.forEach((el) => {
          el.classList.add('active');
          el.classList.contains('email') ? el.lastElementChild.textContent = '이메일을 확인해주세요.' : el.lastElementChild.textContent = '비밀번호를 확인해주세요.';
        })
      }
    }
  })
}
btnLogin.addEventListener('click', login);

form.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
  }
})

// 눈 아이콘 클릭 시 비밀번호 안보이게 하기
function eyeOn(e){
  e.preventDefault();

  e.target.parentElement.classList.toggle('active');
  if(e.target.parentElement.classList.contains('active')){
    e.target.previousElementSibling.setAttribute('type', 'text');
    e.target.setAttribute('src', './images/ico-eye-on.svg');
  }else{
    e.target.previousElementSibling.setAttribute('type', 'password');
    e.target.setAttribute('src', './images/ico-eye-off.svg');
  }
}
eyeOff.addEventListener('click', eyeOn);













