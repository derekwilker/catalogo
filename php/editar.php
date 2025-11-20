<?php
include 'conexao.php';

$id = $_GET['id'];
$produto = $pdo->query("SELECT * FROM produtos WHERE id = $id")->fetch();

if ($_POST) {
    try {
        $stmt = $pdo->prepare("UPDATE produtos SET nome = ?, descricao = ?, preco = ?, categoria_id = ? WHERE id = ?");
        $stmt->execute([
            $_POST['nome'],
            $_POST['descricao'],
            $_POST['preco'],
            $_POST['categoria_id'],
            $id
        ]);
        header('Location: admin.php?sucesso=1');
    } catch (PDOException $e) {
        echo "Erro: " . $e->getMessage();
    }
}
?>
<!-- Formulário similar ao cadastro.php, mas preenchido com os dados do produto -->