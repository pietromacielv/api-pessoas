const conexao = require('./mySql')

// Controlador para atualizar uma pessoa específica
class AtualizarPessoasController {
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

module.exports = { AtualizarPessoasController }