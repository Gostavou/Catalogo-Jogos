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

    if (
        $id == "" ||
        $nome == "" ||
        $desenvolvedora == "" ||
        $genero == "" ||
        $plataforma == "" ||
        $status_jogo == ""
    ) {

        echo "<script>
        alert('Preencha todos os campos');
        window.history.back();
        </script>";
        exit;
    }

    if (!is_numeric($nota) || $nota < 0 || $nota > 5) {

        echo "<script>
        alert('Nota inválida (0 a 5)');
        window.history.back();
        </script>";
        exit;
    }

    $sqlImagem = "";
    $tipos = "sssdssi";
    $valores = [
        $nome,
        $desenvolvedora,
        $genero,
        $nota,
        $plataforma,
        $status_jogo
    ];

    if (
        isset($_FILES['capa']) &&
        $_FILES['capa']['error'] == 0
    ) {

        $nomeImagem = time() . "_" . $_FILES['capa']['name'];

        $caminhoImagem = "../img/" . $nomeImagem;

        move_uploaded_file(
            $_FILES['capa']['tmp_name'],
            $caminhoImagem
        );

        $sqlImagem = ", capa=?";

        $tipos = "sssdsssi";

        $valores[] = $caminhoImagem;
    }

    $valores[] = $id;

    $sql = "UPDATE jogos SET
        nome=?,
        desenvolvedora=?,
        genero=?,
        nota=?,
        plataforma=?,
        status_jogo=?
        $sqlImagem
        WHERE id=?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        $tipos,
        ...$valores
    );

    if ($stmt->execute()) {

        header("Location: ../index.html");

    } else {

        echo "Erro: " . $stmt->error;

    }

    $stmt->close();
}

$conn->close();
