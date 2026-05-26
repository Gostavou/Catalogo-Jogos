const formCadastro = document.getElementById('formCadastro')

formCadastro.addEventListener("submit", function (event){
    const campoNome = document.getElementById("nome")
    const campoEmail = document.getElementById("email")

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();

    if(nome==="" || email===""){
        event.preventDefault();

        alert("Por favor, preencha todos os campos antes de prosseguir;")
    }
})