let dadosOriginais = [];

carregarDados();

async function carregarDados() {
    try {
        const resposta = await fetch("back/listar.php");
        dadosOriginais = await resposta.json();
        montarCards(dadosOriginais);
    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
    }
}

function montarCards(listaDeDados) {
    const container = document.getElementById("containerCards");
    container.innerHTML = "";

    if (listaDeDados.length === 0) {
        container.innerHTML = "<p>Nenhum registro encontrado</p>";
        return;
    }

    listaDeDados.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";

        const titulo = document.createElement("h3");
        titulo.textContent = item.nome;

        const texto = document.createElement("p");
        texto.textContent = item.email;

        const divBotoes = document.createElement("div");
        divBotoes.className = "btn-acoes";

        const btnAtualizar = document.createElement("button");
        btnAtualizar.textContent = "Atualizar";
        btnAtualizar.onclick = function () {
            const url = `front/atualizar.html?id=${item.id}&nome=${encodeURIComponent(item.nome)}&email=${encodeURIComponent(item.email)}`;
            window.location.href = url;
        };

        const btnDeletar = document.createElement("button");
        btnDeletar.textContent = "Deletar";
        btnDeletar.onclick = async function () {
            if (confirm(`Tem certeza que deseja deletar ${item.nome}?`)) {
                await fetch(`back/deletar.php?id=${item.id}`);
                carregarDados(); 
            }
        };

        divBotoes.appendChild(btnAtualizar);
        divBotoes.appendChild(btnDeletar);

        card.appendChild(titulo);
        card.appendChild(texto);
        card.appendChild(divBotoes);

        container.appendChild(card);
    });
}

const campFiltro = document.getElementById("campoFiltro");
campFiltro.addEventListener("input", function (event) {
    const termoBuscado = event.target.value.toLowerCase();
    const dadosFiltrados = dadosOriginais.filter(item => 
        item.nome.toLowerCase().includes(termoBuscado)
    );
    montarCards(dadosFiltrados);
});