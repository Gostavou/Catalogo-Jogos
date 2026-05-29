const parametroDaUrl =
new URLSearchParams(window.location.search);

document.getElementById("idAtualizar").value =
parametroDaUrl.get("id");

document.getElementById("nomeAtualizar").value =
parametroDaUrl.get("nome");

document.getElementById("desenvolvedoraAtualizar").value =
parametroDaUrl.get("desenvolvedora");

document.getElementById("notaAtualizar").value =
parametroDaUrl.get("nota");

document.getElementById("capaAtualizar").value =
parametroDaUrl.get("capa");

document.getElementById("statusAtualizar").value =
parametroDaUrl.get("status_jogo");

const chipsContainer =
document.getElementById("chipsContainer");

const generoFinal =
document.getElementById("generoFinal");

const plataformaSelect =
document.getElementById("plataformaSelect");

const outraPlataformaGroup =
document.getElementById("outraPlataformaGroup");

const outraPlataforma =
document.getElementById("outraPlataforma");

const plataformaFinal =
document.getElementById("plataformaFinal");

const btnAdicionarGenero =
document.getElementById("btnAdicionarGenero");

const novoGenero =
document.getElementById("novoGenero");

let generosSelecionados = [];

const generosPadrao = [
    "Ação",
    "RPG",
    "Aventura",
    "Terror",
    "Survival",
    "FPS",
    "Mundo Aberto",
    "Puzzle",
    "Corrida",
    "Luta",
    "Hack and Slash",
    "Soulslike",
    "Estratégia",
    "Simulação"
];

const generoParametro =
parametroDaUrl.get("genero") || "";

const generosSalvos =
generoParametro
.split(",")
.map(g => g.trim())
.filter(g => g !== "");

function atualizarGeneroFinal() {
    generoFinal.value =
    generosSelecionados.join(",");
}

function criarChip(
    texto,
    selecionado = false,
    personalizado = false
) {

    const chip =
    document.createElement("div");

    chip.className = "chip";

    if (selecionado) {
        chip.classList.add("selected");
    }

    chip.dataset.genero = texto;

    chip.innerHTML = `
        <span>${texto}</span>
    `;

    if (personalizado) {

        const btnRemover =
        document.createElement("button");

        btnRemover.className =
        "remove-chip";

        btnRemover.type =
        "button";

        btnRemover.textContent =
        "×";

        btnRemover.onclick =
        function (event) {

            event.stopPropagation();

            chip.remove();

            generosSelecionados =
            generosSelecionados.filter(
                g => g !== texto
            );

            atualizarGeneroFinal();

        };

        chip.appendChild(btnRemover);

    }

    chip.addEventListener("click", function () {

        chip.classList.toggle("selected");

        if (
            generosSelecionados.includes(texto)
        ) {

            generosSelecionados =
            generosSelecionados.filter(
                g => g !== texto
            );

        } else {

            generosSelecionados.push(texto);

        }

        atualizarGeneroFinal();

    });

    chipsContainer.appendChild(chip);
}

chipsContainer.innerHTML = "";

generosPadrao.forEach(genero => {

    const selecionado =
    generosSalvos.includes(genero);

    if (selecionado) {
        generosSelecionados.push(genero);
    }

    criarChip(
        genero,
        selecionado,
        false
    );

});

generosSalvos.forEach(genero => {

    if (!generosPadrao.includes(genero)) {

        generosSelecionados.push(genero);

        criarChip(
            genero,
            true,
            true
        );

    }

});

btnAdicionarGenero.addEventListener("click", function () {

    const valor =
    novoGenero.value.trim();

    if (valor === "") return;

    if (valor.length > 30) {
        alert("O gênero pode ter no máximo 30 caracteres.");
        return;
    }

    const existe =
    document.querySelector(
        `[data-genero="${valor}"]`
    );

    if (existe) {
        alert("Esse gênero já existe.");
        return;
    }

    generosSelecionados.push(valor);

    criarChip(
        valor,
        true,
        true
    );

    atualizarGeneroFinal();

    novoGenero.value = "";
});

const plataformaSalva =
parametroDaUrl.get("plataforma");

const plataformasPadrao = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo"
];

if (
    plataformasPadrao.includes(plataformaSalva)
) {

    plataformaSelect.value =
    plataformaSalva;

} else {

    plataformaSelect.value =
    "Outro";

    outraPlataformaGroup.style.display =
    "flex";

    outraPlataforma.value =
    plataformaSalva;

}

plataformaSelect.addEventListener("change", function () {

    if (this.value === "Outro") {
        outraPlataformaGroup.style.display =
        "flex";
    } else {
        outraPlataformaGroup.style.display =
        "none";
    }

});

document
.getElementById("formAtualizar")
.addEventListener("submit", function(event){

    const nome =
    document.getElementById("nomeAtualizar").value.trim();

    const desenvolvedora =
    document.getElementById("desenvolvedoraAtualizar").value.trim();

    const nota =
    document.getElementById("notaAtualizar").value.trim();

    const capa =
    document.getElementById("capaAtualizar").value.trim();

    if (
        plataformaSelect.value === "Outro"
    ) {

        plataformaFinal.value =
        outraPlataforma.value.trim();

    } else {

        plataformaFinal.value =
        plataformaSelect.value;

    }

    atualizarGeneroFinal();

    if (
        nome === "" ||
        desenvolvedora === "" ||
        nota === "" ||
        capa === "" ||
        generoFinal.value === "" ||
        plataformaFinal.value === ""
    ) {

        event.preventDefault();
        alert("Preencha todos os campos.");

    }

});