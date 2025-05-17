firebase.auth().onAuthStateChanged(user => {
    if (user){
        window.document.href = '../../index.html'
    }
})