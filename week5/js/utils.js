const pwCheckInput = document.getElementById('signup-check-password');
const correct = {
  pattern: {
    email: /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/,
    password: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
  },
  userInfo: {
    email: 'test@codeit.com',
    password: 'codeit101',
  },
}
const errorMessage = {
  empty: {
    email: '이메일을 입력하세요',
    password: '비밀번호를 입력하세요',
  },
  validation: {
    email: '올바른 이메일 주소가 아닙니다.',
    password: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
  },
  check: {
    email: '이메일을 확인해주세요.',
    password: '비밀번호를 확인해주세요.',
  },
  incorrect : {
    email: '이미 사용 중인 이메일입니다.',
    password: '비밀번호가 일치하지않아요.',
  },
}

// 에러 메세지
function errorPrint(target, { email, password } = '') {
  const errorText = document.querySelectorAll('.error-messeage');
  if(target.type === 'email') return errorText[0].textContent = email;
  if(pwCheckInput){
    if(target.type === 'password'){
      target !== pwCheckInput ? errorText[1].textContent = password : errorText[2].textContent = password;
    }
  }else{
    errorText[1].textContent = password;
  }
}

// 이메일, 비밀번호 비어있는 값 확인
function emptyInput({ target }){
  if(target.value === ''){
    target.classList.add('active');
    errorPrint(target, errorMessage.empty);
  }else{
    target.classList.remove('active');
    errorPrint(target);
    validate(target);     
  }
}

// 이메일, 비밀번호 유효성 검사
function validate(target){
  const { email, password } = correct.pattern; 
  if(email.test(target.value)) return;
  if(password.test(target.value)) return;
  target.classList.add('active');
  errorPrint(target, errorMessage.validation);
}

export { pwCheckInput, correct, errorMessage, errorPrint, emptyInput }