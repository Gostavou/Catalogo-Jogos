let dadosOriginais = [];

let filtros = {
    nome: "",
    nota: "",
    status: "",
    plataforma: ""
};

carregarDados();

async function carregarDados() {

    const resposta = await fetch("back/listar.php");

    dadosOriginais = await resposta.json();

    montarFiltros();
    montarCards(dadosOriginais);
}

function montarFiltros() {

    document.getElementById("campoFiltro").addEventListener("input", function () {
        filtros.nome = this.value.toLowerCase();
        aplicarFiltros();
    });

    document.getElementById("filtroNota").addEventListener("change", function () {
        filtros.nota = this.value;
        aplicarFiltros();
    });

    document.getElementById("filtroStatus").addEventListener("change", function () {
        filtros.status = this.value;
        aplicarFiltros();
    });

    document.getElementById("filtroPlataforma").addEventListener("change", function () {
        filtros.plataforma = this.value;
        aplicarFiltros();
    });
}

function aplicarFiltros() {

    let lista = dadosOriginais;

    if (filtros.nome) {
        lista = lista.filter(jogo =>
            jogo.nome.toLowerCase().includes(filtros.nome)
        );
    }

    if (filtros.status) {
        lista = lista.filter(jogo =>
            jogo.status_jogo === filtros.status
        );
    }

    if (filtros.plataforma) {

        const plataformasPadrao = [
            "PC",
            "PlayStation",
            "Xbox",
            "Nintendo"
        ];

        if (filtros.plataforma === "Outros") {
            lista = lista.filter(jogo =>
                !plataformasPadrao.includes(jogo.plataforma)
            );
        } else {
            lista = lista.filter(jogo =>
                jogo.plataforma === filtros.plataforma
            );
        }
    }

    if (filtros.nota) {

        const [min, max] = filtros.nota.split("-").map(Number);

        lista = lista.filter(jogo => {
            const nota = parseFloat(jogo.nota);
            return nota >= min && nota <= max;
        });
    }

    montarCards(lista);
}

function montarCards(lista) {

    const container = document.getElementById("containerCards");
    const template = document.getElementById("cardTemplate");

    container.innerHTML = "";

    if (!lista || lista.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>Não há jogos para mostrar</h2>
                <p>Sua biblioteca está vazia ou nenhum jogo foi encontrado.</p>
                <button onclick="window.location.href='front/cadastrar.html'">
                    Cadastrar novo jogo
                </button>
            </div>
        `;
        return;
    }

    lista.forEach(item => {

        const card = template.content.cloneNode(true);

        card.querySelector(".capa-jogo").src = item.capa;

        card.querySelector(".nome").textContent = item.nome;

        card.querySelector(".dev span").textContent = item.desenvolvedora;

        card.querySelector(".nota span").textContent = item.nota;

        card.querySelector(".plataforma span").textContent = item.plataforma;

        card.querySelector(".status span").textContent = item.status_jogo;

        const generosArea = card.querySelector(".generos-area");

        if (item.genero) {

            const generos = item.genero.split(",").map(g => g.trim());

            const limite = 3;
            const exibidos = generos.slice(0, limite);
            const restantes = generos.length - limite;

            exibidos.forEach(g => {
                const span = document.createElement("span");
                span.className = "genero-chip";
                span.textContent = g;
                generosArea.appendChild(span);
            });

            if (restantes > 0) {
                const span = document.createElement("span");
                span.className = "genero-chip more";
                span.textContent = `+${restantes}`;
                generosArea.appendChild(span);
            }
        }

        const btnArea = card.querySelector(".btn-acoes");

        const btnAtualizar = document.createElement("button");
        btnAtualizar.textContent = "Atualizar";

        btnAtualizar.onclick = function () {

            const url =
                `front/atualizar.html?id=${item.id}` +
                `&nome=${encodeURIComponent(item.nome)}` +
                `&desenvolvedora=${encodeURIComponent(item.desenvolvedora)}` +
                `&genero=${encodeURIComponent(item.genero || "")}` +
                `&nota=${encodeURIComponent(item.nota)}` +
                `&plataforma=${encodeURIComponent(item.plataforma)}` +
                `&capa=${encodeURIComponent(item.capa)}` +
                `&status_jogo=${encodeURIComponent(item.status_jogo)}`;

            window.location.href = url;
        };

        const btnDeletar = document.createElement("button");
        btnDeletar.textContent = "Deletar";

        btnDeletar.onclick = async function () {

            const confirmar = confirm(`Tem certeza que deseja excluir "${item.nome}"?`);

            if (confirmar) {
                await fetch(`back/deletar.php?id=${item.id}`);
                carregarDados();
            }
        };

        btnArea.appendChild(btnAtualizar);
        btnArea.appendChild(btnDeletar);

        container.appendChild(card);
    });
}