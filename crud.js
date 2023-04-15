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

  class AtualizarPessoas {
    atualizarPessoa(req, res) {
        // obtém o id da pessoa a ser atualizada a partir dos parâmetros da requisição
        const id = req.params.id; 

        // obtém os novos dados da pessoa a partir do corpo da requisição
        const { nome, sobrenome, idade, peso } = req.body 

        // define a query SQL para atualizar a pessoa no banco de dados
        const query = 'UPDATE pessoas SET nome = ?, sobrenome = ?, idade = ?, peso = ? WHERE id = ?' 

        // executa a query SQL no banco de dados, passando os novos dados e o id da pessoa como parâmetros
        conexao.query(query, [nome, sobrenome, idade, peso, id], (erro, resultados) => { 
            try {
                if (resultados.affectedRows == 0) { // verifica se nenhuma linha foi afetada pela query, ou seja, se a pessoa não foi encontrada no banco de dados
                    res.status(404).json({ message: 'Pessoa não encontrada.'}); // retorna um erro 404 com uma mensagem indicando que a pessoa não foi encontrada
                }
                res.status(200).json({ message: `Pessoa ${id} atualizada com sucesso.` }) // se a pessoa foi encontrada e atualizada com sucesso, retorna uma mensagem indicando o sucesso da operação
            } catch {
                console.log(erro) // se ocorrer um erro durante a execução da query SQL, registra o erro no console
                res.status(500).json({ message: 'Erro ao atualizar pessoa.'}); // retorna um erro 500 com uma mensagem indicando que ocorreu um erro ao atualizar a pessoa
            }
        })
    }
}


class DeletarPessoas {
    deletarPessoa(req, res) {
        const id = req.params.id // recebe o id da pessoa a ser deletada através dos parâmetros da requisição
        const query = 'DELETE FROM pessoas WHERE id = ?' // query que deleta a pessoa com o id especificado
        conexao.query(query, [id], (erro, resultados) => { // executa a query na conexão com o banco de dados, passando o id como parâmetro
            try {
                if (resultados.affectedRows == 0) { // se a query não afetou nenhuma linha, significa que a pessoa não foi encontrada
                    res.status(404).json({ message: 'Pessoa não encontrada.'}); // retorna um erro 404 com mensagem de erro
                }
                res.status(200).json({ message: `Pessoa ${id} deletada com sucesso.`}) // se a pessoa foi deletada com sucesso, retorna uma mensagem de sucesso
            } catch {
                console.log(erro) // se houver algum erro, exibe o erro no console
                res.status(500).json({ message: 'Erro ao deletar pessoa.'}); // retorna um erro 500 com mensagem de erro
            }
        })
    }
}

  module.exports = {
    BuscarPessoasController,
    PostarPessoasController,
    BuscarPessoasIdController,
    AtualizarPessoas,
    DeletarPessoas
}