const mysql = require('mysql2')

// Criando uma conexão com o banco de dados para buscar pessoas por id
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3000',
    password: '12345',
    database: 'lista_pessoas'
});

// Controlador para buscar uma pessoa por id
class BuscarPessoasIdController {
    buscarPessoaId(req, res) {
      const id = req.params.id;
  
      const query = 'SELECT * FROM pessoas WHERE id = ?';
      // Executando a query para buscar a pessoa com o id especificado
      conexao.query(query, [id], (erro, resultados) => {
        try {
          // Retornando um erro 404 caso a pessoa não seja encontrada
          if (resultados.lenght == 0) {
            res.status(404).json({ message: 'Pessoa não encontrada.' }); // erro de digitação por parte do usuario
          }
  
          // Transformando o resultado em um formato mais legível para o cliente
          const pessoa = resultados[0];
          // Retornando a pessoa encontrada para o cliente
          res.status(200).json({ data: { id: pessoa.id, nome: pessoa.nome, sobrenome: pessoa.sobrenome, idade: pessoa.idade, peso: pessoa.peso } })
        } catch {
          // Retornando um erro 500 caso ocorra algum erro durante a inserção
          console.log(erro)
          res.status(500).json({ message: 'Erro ao buscar pessoa.' }); // internal server erro
          return;
        }
      })
    }
  }

module.exports = { BuscarPessoasIdController }