const parametroDaUrl = new URLSearchParams(window.location.search);

const campoID = document.getElementById("idAtualizar");
const campoNome = document.getElementById("nomeAtualizar");
const campoEmail = document.getElementById("emailAtualizar");

campoID.value = parametroDaUrl.get("id");
campoNome.value = parametroDaUrl.get("nome");
campoEmail.value = parametroDaUrl.get("email");