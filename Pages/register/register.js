window.onload = function () {
    // Verificar o estado de autenticação assim que a página for carregada
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.location.href = "../home/home.html";
      }
    });
  };
  
function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password === confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) return false;

    const password = form.password().value;
    if (!password || password.length < 6) return false;

    const confirmPassword = form.confirmPassword().value;
    if (password !== confirmPassword) return false;

    return true;
}

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button')
};

function BackLogin() {
    window.location.href = "../../index.html";
}
function register() {
    ShowLoading();
    hideError();
    const email = form.email().value;
    const password = form.password().value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            HideLoading();
            window.location.href = "../../pages/home/home.html";
        })
        .catch((error) => {
            HideLoading();
            console.error("Erro Firebase:", error);
            showError(getErrorMessage(error));
        });
}

function getErrorMessage(error) {
    if (!error || !error.code) return "Erro desconhecido";

    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'Este email já está cadastrado. Tente fazer login ou use outro email.';
        case 'auth/invalid-email':
            return 'O email digitado é inválido.';
        case 'auth/weak-password':
            return 'A senha é muito fraca. Use pelo menos 6 caracteres.';
        default:
            return 'Erro ao registrar: ' + error.message;
    }
}

function showError(message) {
    const errorDiv = document.getElementById('register-error');
    errorDiv.style.display = 'block';
    errorDiv.innerText = message;
}

function hideError() {
    const errorDiv = document.getElementById('register-error');
    errorDiv.style.display = 'none';
    errorDiv.innerText = '';
}

