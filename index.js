const form = {
  email: () => document.getElementById('email'),
  emailError: () => document.getElementById('email-error'),
  emailInvalid: () => document.getElementById('email-invalid'),
  password: () => document.getElementById('password'),
  passwordError: () => document.getElementById('password-error'),
  loginButton: () => document.getElementById('login-button'),
  googleLoginButton: () => document.querySelector('.google-login-button'),
};

form.googleLoginButton().addEventListener('click', loginWithGoogle);

function onChangeEmail() {
  toggleButtonsDisable();
  toggleEmailErrors();
}

function onChangePassword() {
  toggleButtonsDisable();
  togglePasswordErrors();
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isEmailValid() {
  const email = form.email().value.trim();
  return email ? validateEmail(email) : false;
}

function isPasswordValid() {
  return form.password().value.trim() !== "";
}

function toggleEmailErrors() {
  const email = form.email().value.trim();
  const emailError = form.emailError();
  const emailInvalid = form.emailInvalid();

  // Lógica de exibição de erro
  if (!email) {
    emailError.style.display = 'block'; // Exibe "Email obrigatório"
    emailInvalid.style.display = 'none'; // Esconde o "Email inválido"
  } else if (!validateEmail(email)) {
    emailError.style.display = 'none'; // Esconde "Email obrigatório"
    emailInvalid.style.display = 'block'; // Exibe "Email inválido"
  } else {
    emailError.style.display = 'none'; // Esconde "Email obrigatório"
    emailInvalid.style.display = 'none'; // Esconde "Email inválido"
  }
}

function togglePasswordErrors() {
  const password = form.password().value.trim();
  const passwordError = form.passwordError();

  passwordError.style.display = password ? 'none' : 'block'; // Exibe erro se senha estiver vazia
}

function toggleButtonsDisable() {
  const emailValid = isEmailValid();
  const passwordValid = isPasswordValid();

  form.loginButton().disabled = !(emailValid && passwordValid);
}

function login() {
  ShowLoading();
  firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value)
    .then(response => {
      HideLoading();
      window.location.href = "pages/home/home.html";
    })
    .catch(error => {
      HideLoading();
      alert(getErrorMensage(error));
      console.error("Erro ao fazer login", error);
    });
}

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      console.log('Usuário logado com o Google:', user);
      window.location.href = "pages/home/home.html";
    })
    .catch(error => {
      alert("Erro ao fazer login com o Google: " + error.message);
      console.error("Erro ao fazer login com o Google:", error);
    });
}

function getErrorMensage(error) {
  if (error.code === 'auth/user-not-found') {
    return 'Usuário não encontrado!';
  }
  return error.message;
}

function register() {
  ShowLoading();
  setTimeout(() => {
    window.location.href = "pages/register/register.html";
  }, 1000);
}
