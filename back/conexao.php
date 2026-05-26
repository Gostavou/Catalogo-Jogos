<?php


$servidor = "localhost";
$usuario = "root";
$senha = "";
$nomeDoBanco = "crud_dinamico";

$conn = new mysqli($servidor, $usuario, $senha, $nomeDoBanco);

if ($conn->connect_error) {
    die("Falha na conexão ". $conn->connect_error);
}
