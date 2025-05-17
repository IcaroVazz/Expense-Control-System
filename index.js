const form = {
  email: () => document.getElementById('email'),
  emailError: () => document.getElementById('email-error'),
  emailInvalid: () => document.getElementById('email-invalid'),
  password: () => document.getElementById('password'),
  passwordError: () => document.getElementById('password-error'),
  recoveryPassword: () => document.getElementById('recovery-password-btn'),
  loginButton: () => document.getElementById('login-button'),
};

// Verificar o estado de autenticação assim que a página for carregada
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // Se o usuário estiver autenticado, redireciona para a página inicial
    window.location.href = "pages/home/home.html";
  }
});

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

  !email
    ? (emailError.style.display = 'block', emailInvalid.style.display = 'none')
    : !validateEmail(email)
    ? (emailError.style.display = 'none', emailInvalid.style.display = 'block')
    : (emailError.style.display = 'none', emailInvalid.style.display = 'none');
}

function togglePasswordErrors() {
  const password = form.password().value.trim();
  const passwordError = form.passwordError();

  passwordError.style.display = password ? 'none' : 'block';
}

function toggleButtonsDisable() {
  const emailValid = isEmailValid();
  const passwordValid = isPasswordValid();

  form.loginButton().disabled = !(emailValid && passwordValid);
  form.recoveryPassword().disabled = !emailValid;
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
      alert(error.code);
      console.error("Erro ao fazer login", error);
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

function RecoveryPassword() {
  const email = form.email().value.trim();

  if (!email) {
    alert("Por favor, preencha o campo de e-mail.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Digite um e-mail válido.");
    return;
  }

  ShowLoading();
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      HideLoading();
      alert("Email enviado com sucesso!");
    })
    .catch(error => {
      HideLoading();
      alert(getErrorMensage(error));
      console.error("Erro ao enviar e-mail de recuperação:", error);
    });
}
