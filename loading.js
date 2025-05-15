function ShowLoading() {
    let loading = document.getElementById('loading');
  
    if (!loading) {
      loading = document.createElement('div');
      loading.id = 'loading';
      loading.className = 'loading';
      loading.innerHTML = 'Carregando...';
      document.body.appendChild(loading);
    }
  
    loading.style.display = 'flex';
  }
  
  function HideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.style.display = 'none';
    }
  }
  