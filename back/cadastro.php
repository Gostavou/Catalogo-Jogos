<?php

include 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];

    $sql = "INSERT INTO usuarios (nome, email) values (?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $nome, $email);

    if ($stmt->execute()) {
        header("Location: ../index.html");
    } else {
        echo "erro". $stmt->error;
    }
    $stmt->close();
}

$conn->close();
