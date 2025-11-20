<?php include 'conexao.php'; ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Produtos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Catálogo de Produtos</h1>
        <nav>
            <a href="index.php">Início</a>
            <a href="admin.php">Administração</a>
            <a href="cadastro.php">Cadastrar Produto</a>
        </nav>
    </header>

    <main>
        <h2>Produtos em Destaque</h2>
        <div class="produtos-container">
            <?php
            $stmt = $pdo->query("SELECT p.*, c.nome as categoria_nome 
                                FROM produtos p 
                                LEFT JOIN categorias c ON p.categoria_id = c.id");
            while ($produto = $stmt->fetch(PDO::FETCH_ASSOC)) {
                echo "
                <div class='produto-card'>
                    <h3>{$produto['nome']}</h3>
                    <p>{$produto['descricao']}</p>
                    <span class='preco'>R$ {$produto['preco']}</span>
                    <span class='categoria'>{$produto['categoria_nome']}</span>
                </div>";
            }
            ?>
        </div>
    </main>

    <footer>
        <p>&copy; 2024 Catálogo de Produtos</p>
    </footer>
</body>
</html>