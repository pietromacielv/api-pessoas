const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3000',
    password: '12345',
    database: 'lista_pessoas'
});


// class PessoasController {
//     static buscarPessoas(req, res) {
//         const query = 'SELECT * FROM pessoas';
//         conexao.query(query, (erro, resultados) => {
//             try {
//                 const pessoas = resultados.map(pessoa => {
//                     return { id: pessoa.id, nome: pessoa.nome, sobrenome: pessoa.sobrenome, idade: pessoa.idade, peso: pessoa.peso}
//                 });
//                 res.status(200).json({ data: pessoas }) // sucedido
//             } catch {
//                 console.log(erro)
//                 res.status(500).json({ message: 'Erro ao buscar pessoas.'});
//                 return;
//             }
//         })
//     }
//     static postarPessoas(req, res) {
//         const { nome, sobrenome, idade, peso } = req.body
//         const query = 'INSERT INTO pessoas (nome, sobrenome, idade, peso) VALUES (?, ?, ?, ?)';
//         conexao.query(query, [nome, sobrenome, idade, peso], (erro, resultados) => {
//             try {
//                 const id = resultados.insertId;
//                 const message = `Pessoa ${id} criada com sucesso!`;
//                 res.status(201).json({ message, id }) // 201: ação sucedida e essa ação gerou um item. (retorna na requisição)
//             } catch {
//                 console.log(erro);
//                 res.status(500).json({ message: 'Erro ao inserir pessoa '}) // 500: erro server-side
//             }
//         })
//     }
//     static buscarPessoasId(req, res) {
//         const id = req.params.id;

//         const query = 'SELECT * FROM pessoas WHERE id = ?';
//         conexao.query(query, [id], (erro, resultados) => {
//             try {
//                 if (resultados.lenght == 0) {
//                     res.status(404).json({ message: 'Pessoa não encontrada.'}); // erro de digitação por parte do usuario
//                 }
        
//                 const pessoa = resultados[0];
//                 res.status(200).json({data: {id: pessoa.id, nome: pessoa.nome, sobrenome: pessoa.sobrenome, idade: pessoa.idade, peso: pessoa.peso}})
//             } catch {
//                 console.log(erro)
//             res.status(500).json({ message: 'Erro ao buscar pessoa.' }); // internal server erro
//             return;
//             }
//         })
//     }
//  }

class BuscarPessoasController {
    buscarPessoa(req, res) {
      const query = 'SELECT * FROM pessoas';
      conexao.query(query, (erro, resultados) => {
        try {
          const pessoas = resultados.map(pessoa => {
            return { id: pessoa.id, nome: pessoa.nome, sobrenome: pessoa.sobrenome, idade: pessoa.idade, peso: pessoa.peso }
          });
          res.status(200).json({ data: pessoas }) // sucedido
        } catch {
          console.log(erro)
          res.status(500).json({ message: 'Erro ao buscar pessoas.' });
          return;
        }
      })
    }
  }
  
class PostarPessoasController {
    postarPessoa(req, res) {
      const { nome, sobrenome, idade, peso } = req.body
      const query = 'INSERT INTO pessoas (nome, sobrenome, idade, peso) VALUES (?, ?, ?, ?)';
      conexao.query(query, [nome, sobrenome, idade, peso], (erro, resultados) => {
        try {
          const id = resultados.insertId;
          const message = `Pessoa ${id} criada com sucesso!`;
          res.status(201).json({ message, id }) // 201: ação sucedida e essa ação gerou um item. (retorna na requisição)
        } catch {
          console.log(erro);
          res.status(500).json({ message: 'Erro ao inserir pessoa ' }) // 500: erro server-side
        }
      })
    }
  }

class BuscarPessoasIdController {
    buscarPessoaId(req, res) {
      const id = req.params.id;
  
      const query = 'SELECT * FROM pessoas WHERE id = ?';
      conexao.query(query, [id], (erro, resultados) => {
        try {
          if (resultados.lenght == 0) {
            res.status(404).json({ message: 'Pessoa não encontrada.' }); // erro de digitação por parte do usuario
          }
  
          const pessoa = resultados[0];
          res.status(200).json({ data: { id: pessoa.id, nome: pessoa.nome, sobrenome: pessoa.sobrenome, idade: pessoa.idade, peso: pessoa.peso } })
        } catch {
          console.log(erro)
          res.status(500).json({ message: 'Erro ao buscar pessoa.' }); // internal server erro
          return;
        }
      })
    }
  }

class AtualizarPessoas {
    atualizarPessoa(req, res) {
        const id = req.params.id;
        const { nome, sobrenome, idade, peso } = req.body
        const query = 'UPDATE pessoas SET nome = ?, sobrenome = ?, idade = ?, peso = ? WHERE id = ?'
        conexao.query(query, [nome, sobrenome, idade, peso, id], (erro, resultados) => {
            try {
                if (resultados.affectedRows == 0) {
                    res.status(404).json({ message: 'Pessoa não encontrada. '}); //erro de digitação por parte do usuario
                }
                res.status(200).json({ message: `Pessoa ${id} atualizada com sucesso.` })
            } catch {
                console.log(erro)
                res.status(500).json({ message: 'Erro ao atualizar pessoa. '}); // internal server error
            }
        })
    }
}

class DeletarPessoas {
    deletarPessoa(req, res) {
        const id = req.params.id
        const query = 'DELETE FROM pessoas WHERE id = ?'
        conexao.query(query, [id], (erro, resultados) => {
            try {
                if (resultados.affectedRows == 0) {
                    res.status(404).json({ message: 'Pessoa não encontrada. '}); // erro de digitação
                }
                res.status(200).json({ message: `Pessoa ${id} deletada com sucesso. `})
            } catch {
                console.log(erro)
                res.status(500).json({ message: 'Erro ao deletar pessoa. '}); // internal server error
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