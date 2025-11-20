<?php
include 'conexao.php';

if ($_POST) {
    try {
        $stmt = $pdo->prepare("INSERT INTO produtos (nome, descricao, preco, categoria_id) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $_POST['nome'],
            $_POST['descricao'],
            $_POST['preco'],
            $_POST['categoria_id']
        ]);
        header('Location: admin.php?sucesso=1');
    } catch (PDOException $e) {
        echo "Erro: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Cadastrar Produto</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Cadastrar Novo Produto</h1>
        <nav>
            <a href="index.php">Voltar</a>
        </nav>
    </header>

    <main>
        <form method="POST" onsubmit="return validarFormulario()">
            <label>Nome:</label>
            <input type="text" name="nome" id="nome" required>
            
            <label>Descrição:</label>
            <textarea name="descricao" id="descricao"></textarea>
            
            <label>Preço:</label>
            <input type="number" step="0.01" name="preco" id="preco" required>
            
            <label>Categoria:</label>
            <select name="categoria_id" id="categoria">
                <?php
                $categorias = $pdo->query("SELECT * FROM categorias");
                while ($categoria = $categorias->fetch()) {
                    echo "<option value='{$categoria['id']}'>{$categoria['nome']}</option>";
                }
                ?>
            </select>
            
            <button type="submit">Cadastrar</button>
        </form>
    </main>

    <script>
        function validarFormulario() {
            const nome = document.getElementById('nome').value;
            const preco = document.getElementById('preco').value;
            
            if (nome.length < 2) {
                alert('Nome deve ter pelo menos 2 caracteres');
                return false;
            }
            
            if (preco <= 0) {
                alert('Preço deve ser maior que zero');
                return false;
            }
            
            return true;
        }
    </script>
</body>
</html>