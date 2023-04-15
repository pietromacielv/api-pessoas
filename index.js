const express = require('express');
const { 
    BuscarPessoasController, 
    PostarPessoasController, 
    BuscarPessoasIdController, 
    AtualizarPessoas, 
    DeletarPessoas } = require('./crud');


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
app.put('/pessoas/:id', new AtualizarPessoas().atualizarPessoa)
// deleta
app.delete('/pessoas/:id', new DeletarPessoas().deletarPessoa)

app.listen(port, () => {
    console.log(`Servidor iniciado - porta ${port}`)
})