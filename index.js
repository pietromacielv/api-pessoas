const express = require('express');
const { PostarPessoasController } = require('./controladores_pessoas/postaPessoas')
const { BuscarPessoasController } = require('./controladores_pessoas/buscaPessoas')
const { BuscarPessoasIdController } = require('./controladores_pessoas/buscaPessoasId')
const { AtualizarPessoasController } = require('./controladores_pessoas/atualizaPessoas')
const { DeletarPessoasController } = require('./controladores_pessoas/deletaPessoas')


const app = express();
const port = 3001;

app.use(express.json());

// cria pessoa
app.post('/pessoas', new PostarPessoasController().postarPessoa)

// lista TODAS pessoas
app.get('/pessoas', new BuscarPessoasController().buscarPessoa)

// lista por id
app.get('/pessoas/:id', new BuscarPessoasIdController().buscarPessoaId)
// atualiza
app.put('/pessoas/:id', new AtualizarPessoasController().atualizarPessoa)
// deleta
app.delete('/pessoas/:id', new DeletarPessoasController().deletarPessoa)

app.listen(port, () => {
    console.log(`Servidor iniciado - porta ${port}`)
})