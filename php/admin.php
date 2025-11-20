<?php include 'conexao.php'; ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Painel Administrativo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Painel Administrativo</h1>
        <nav>
            <a href="index.php">Voltar ao Site</a>
        </nav>
    </header>

    <main>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $produtos = $pdo->query("SELECT p.*, c.nome as categoria_nome 
                                       FROM produtos p 
                                       LEFT JOIN categorias c ON p.categoria_id = c.id");
                while ($produto = $produtos->fetch()) {
                    echo "
                    <tr>
                        <td>{$produto['nome']}</td>
                        <td>{$produto['descricao']}</td>
                        <td>R$ {$produto['preco']}</td>
                        <td>{$produto['categoria_nome']}</td>
                        <td>
                            <a href='editar.php?id={$produto['id']}'>Editar</a>
                            <a href='excluir.php?id={$produto['id']}' onclick='return confirm(\"Deseja excluir?\")'>Excluir</a>
                        </td>
                    </tr>";
                }
                ?>
            </tbody>
        </table>
    </main>
</body>
</html>