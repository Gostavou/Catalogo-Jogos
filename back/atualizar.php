<?php

include 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $desenvolvedora = $_POST['desenvolvedora'];
    $genero = $_POST['genero'];
    $nota = floatval($_POST['nota']);
    $plataforma = $_POST['plataforma'];
    $status_jogo = $_POST['status_jogo'];
    $capa = $_POST['capa'];

    if (
        $id == "" ||
        $nome == "" ||
        $desenvolvedora == "" ||
        $genero == "" ||
        $plataforma == "" ||
        $status_jogo == "" ||
        $capa == ""
    ) {
        die("Preencha todos os campos");
    }

    if (!is_numeric($nota) || $nota < 0 || $nota > 5) {
        die("Nota inválida (0 a 5)");
    }

    $sql = "UPDATE jogos SET
        nome=?,
        desenvolvedora=?,
        genero=?,
        nota=?,
        plataforma=?,
        status_jogo=?,
        capa=?
        WHERE id=?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "sssdsssi",
        $nome,
        $desenvolvedora,
        $genero,
        $nota,
        $plataforma,
        $status_jogo,
        $capa,
        $id
    );

    if ($stmt->execute()) {
        header("Location: ../index.html");
    } else {
        echo "Erro: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
