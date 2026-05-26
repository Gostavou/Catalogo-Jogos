 <?php

include 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $email = $_POST['email'];

    $sql = "UPDATE usuarios SET nome=?, email=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $nome, $email, $id);

    if ($stmt->execute()) {
        header("Location: ../index.html");
    } else {
        echo "Erro: ".$stmt->error;
    }
    $stmt->close();
}

$conn->close();
