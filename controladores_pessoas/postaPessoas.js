const mysql = require('mysql2')

// Criando uma conexão com o banco de dados
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3000',
    password: '12345',
    database: 'lista_pessoas'
});

// Controlador para inserir uma nova pessoa
class PostarPessoasController {
    postarPessoa(req, res) {
      const { nome, sobrenome, idade, peso } = req.body
      const query = 'INSERT INTO pessoas (nome, sobrenome, idade, peso) VALUES (?, ?, ?, ?)';
      // Executando a query para inserir a nova pessoa
      conexao.query(query, [nome, sobrenome, idade, peso], (erro, resultados) => {
        try {
          // Obtendo o id da nova pessoa inserida
          const id = resultados.insertId;
          // Retornando uma mensagem de sucesso com o id da nova pessoa
          const message = `Pessoa ${id} criada com sucesso!`;
          res.status(201).json({ message, id }) // 201: ação sucedida e essa ação gerou um item. (retorna na requisição)
        } catch {
          console.log(erro);
          // Retornando um erro 500 caso ocorra algum erro durante a inserção
          res.status(500).json({ message: 'Erro ao inserir pessoa' }) // 500: erro server-side
        }
      })
    }
  }

module.exports = { PostarPessoasController }  