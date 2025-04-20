function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html"
    }).catch(() => {
        alert("Erro ao fazer logout")
    })
}

function AlterPage(){
     window.location.href = "../../index.html"
}
