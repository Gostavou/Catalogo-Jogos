const formCadastro =
document.getElementById("formCadastro");

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

function atualizarGeneroFinal() {
    generoFinal.value = generosSelecionados.join(",");
}

document
.querySelectorAll("#chipsContainer .chip")
.forEach(chip => {

    const genero =
    chip.textContent.trim();

    chip.dataset.genero = genero;

    chip.addEventListener("click", function () {

        if (generosSelecionados.includes(genero)) {

            generosSelecionados =
            generosSelecionados.filter(g => g !== genero);

            chip.classList.remove("selected");

        } else {

            generosSelecionados.push(genero);

            chip.classList.add("selected");
        }

        atualizarGeneroFinal();
    });

});

function criarChip(valor) {

    const chip = document.createElement("div");

    chip.className = "chip selected";

    chip.dataset.genero = valor;

    const span = document.createElement("span");
    span.textContent = valor;

    chip.appendChild(span);

    const btnRemover = document.createElement("button");

    btnRemover.type = "button";
    btnRemover.textContent = "×";
    btnRemover.className = "remove-chip";

    btnRemover.onclick = function (e) {

        e.stopPropagation();

        chip.remove();

        generosSelecionados =
        generosSelecionados.filter(g => g !== valor);

        atualizarGeneroFinal();
    };

    chip.appendChild(btnRemover);

    chip.addEventListener("click", function () {

        chip.classList.toggle("selected");

        if (generosSelecionados.includes(valor)) {

            generosSelecionados =
            generosSelecionados.filter(g => g !== valor);

        } else {

            generosSelecionados.push(valor);
        }

        atualizarGeneroFinal();
    });

    chipsContainer.appendChild(chip);
}

btnAdicionarGenero.addEventListener("click", function () {

    const valor = novoGenero.value.trim();

    if (!valor) return;

    
    if (valor.length > 30) {
        alert("O gênero pode ter no máximo 30 caracteres.");
        return;
    }

    const existe =
    document.querySelector(`[data-genero="${valor}"]`);

    if (existe) {
        alert("Esse gênero já existe.");
        return;
    }

    generosSelecionados.push(valor);

    criarChip(valor);

    atualizarGeneroFinal();

    novoGenero.value = "";
});

plataformaSelect.addEventListener("change", function () {

    if (this.value === "Outro") {
        outraPlataformaGroup.style.display = "flex";
    } else {
        outraPlataformaGroup.style.display = "none";
    }

});

formCadastro.addEventListener("submit", function (event) {

    const nome =
    document.getElementById("nome").value.trim();

    const desenvolvedora =
    document.getElementById("desenvolvedora").value.trim();

    const nota =
    document.getElementById("nota").value.trim();

    const capa =
    document.getElementById("capa").value.trim();

    if (plataformaSelect.value === "Outro") {
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
        plataformaFinal.value === "" ||
        capa === "" ||
        generoFinal.value === ""
    ) {
        event.preventDefault();
        alert("Preencha todos os campos.");
    }
});