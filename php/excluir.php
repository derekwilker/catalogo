<?php
include 'conexao.php';

$id = $_GET['id'];
$pdo->exec("DELETE FROM produtos WHERE id = $id");
header('Location: admin.php');
?>