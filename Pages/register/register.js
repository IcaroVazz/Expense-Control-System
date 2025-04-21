// Função chamada quando o email muda
function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButtonDisable();
}

// Função chamada quando a senha muda
function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

// Função chamada quando a confirmação da senha muda
function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

// Função para validar se as senhas coincidem
function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password === confirmPassword ? "none" : "block";
}

// Função para desabilitar o botão de registrar dependendo da validade do formulário
function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

// Função para verificar se o formulário é válido
function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) return false;

    const password = form.password().value;
    if (!password || password.length < 6) return false;

    const confirmPassword = form.confirmPassword().value;
    if (password !== confirmPassword) return false;

    return true;
}

// Função para registrar o usuário com email e senha
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

// Função para registrar com o Google
function registerWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider(); // Cria o provedor Google
    
    // Inicia a autenticação com popup
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // O usuário foi autenticado com sucesso
            const user = result.user;
            console.log("Usuário autenticado com Google:", user);
            
            // Redireciona o usuário para a página de home
            window.location.href = "../../pages/home/home.html"; // Altere para o redirecionamento desejado
        })
        .catch((error) => {
            // Lida com os erros
            console.error("Erro ao registrar com o Google:", error.message);
            alert("Erro ao registrar com o Google: " + error.message);
        });
}

// Função para obter a mensagem de erro
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

// Função para exibir erros
function showError(message) {
    const errorDiv = document.getElementById('register-error');
    errorDiv.style.display = 'block';
    errorDiv.innerText = message;
}

// Função para esconder erros
function hideError() {
    const errorDiv = document.getElementById('register-error');
    errorDiv.style.display = 'none';
    errorDiv.innerText = '';
}

// Função para voltar ao login
function BackLogin() {
    window.location.href = "../../index.html";
}

// Função para validar o formato do email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Objeto de referência para os elementos do formulário
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
