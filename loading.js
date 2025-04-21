function ShowLoading() {
  let loadingOverlay = document.getElementById('loading-overlay');

  if (!loadingOverlay) {
    // Criando o overlay de carregamento
    loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.className = 'loading-overlay';

    // Criando o contêiner de carregamento
    let loading = document.createElement('div');
    loading.className = 'loading';

    // Criando o spinner
    let spinner = document.createElement('div');
    spinner.className = 'spinner';

    // Adicionando o spinner ao contêiner de carregamento
    loading.appendChild(spinner);

    // Criando o texto de carregamento
    let loadingText = document.createElement('span');
    loadingText.innerText = 'Carregando...';
    loading.appendChild(loadingText);

    // Adicionando o contêiner de carregamento ao overlay
    loadingOverlay.appendChild(loading);
    document.body.appendChild(loadingOverlay);
  }

  loadingOverlay.style.display = 'flex'; // Tornando o overlay visível
}

function HideLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.style.display = 'none'; // Ocultando o overlay de carregamento
  }
}
