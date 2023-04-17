const conexao = require('./mySql')

// Criando uma conexão com o banco de dados
// Controlador para deletar uma pessoa específica
class DeletarPessoasController {
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

module.exports = { DeletarPessoasController }