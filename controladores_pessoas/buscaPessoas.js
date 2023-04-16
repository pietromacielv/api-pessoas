const mysql = require('mysql2')

// Criando uma conexão com o banco de dados
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3000',
    password: '12345',
    database: 'lista_pessoas'
});

// Controlador para buscar todas as pessoas
class BuscarPessoasController {
    buscarPessoa(req, res) {
      const query = 'SELECT * FROM pessoas';
      // Executando a query para buscar todas as pessoas
      conexao.query(query, (erro, resultados) => {
        try {
          // Transformando os resultados em um formato mais legível para o cliente
          const pessoas = resultados.map(pessoa => {
            return { id: pessoa.id, nome: pessoa.nome, sobrenome: pessoa.sobrenome, idade: pessoa.idade, peso: pessoa.peso }
          });
          // Retornando as pessoas encontradas para o cliente
          res.status(200).json({ data: pessoas }) // 200: ação sucedida (retorna na requisição)
        } catch {
          console.log(erro)
          // Retornando um erro 500 caso ocorra algum erro durante a busca
          res.status(500).json({ message: 'Erro ao buscar pessoas.' });
          return;
        }
      })
    }
  }
  
module.exports = { BuscarPessoasController }