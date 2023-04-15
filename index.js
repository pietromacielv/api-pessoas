const express = require('express')
const mysql = require('mysql2')


const app = express();
const port = 3001;

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3000',
    password: '12345',
    database: 'lista_pessoas'
});


app.use(express.json());

// cria pessoa
app.post('/pessoas', (req, res) => {
    const { nome, 
            sobrenome, 
            idade, 
            peso 
        } = req.body;
    const query = 'INSERT INTO pessoas (nome, sobrenome, idade, peso) VALUES (?, ?, ?, ?)';
    conexao.query(query, [nome, sobrenome, idade, peso], (erro, resultados) => {
        if (erro) {
            console.log(erro);
            res.status(500).json({ message: 'Erro ao inserir pessoa '}); // 500: erro no servidor
            return
        }

        const id = resultados.insertId;
        const message = `Pessoa ${id} criada com sucesso!`;
        res.status(201).json({ message, id }) // 201: ação sucedida e essa ação gerou um item. (retorna na requisição)
    });  
});

// lista TODAS pessoas
app.get('/pessoas', (req, res) => {
    const query = 'SELECT * FROM pessoas';
    conexao.query(query, (erro, resultados) => {
        if (erro) {
            console.log(erro);
            res.status(500).json({ message: 'Erro ao buscar pessoas.' });
            return;
        }

        const pessoas = resultados.map(pessoa => {
            return { id: pessoa.id, nome: pessoa.nome, sobrenome: pessoa.sobrenome, idade: pessoa.idade, peso: pessoa.peso };
        });
        res.status(200).json({ data: pessoas }); // 200: ação sucedida
    });
});

// lista por id
app.get('/pessoas/:id', (req, res) => {
    const id = req.params.id;

    const query = 'SELECT * FROM pessoas WHERE id = ?';
    conexao.query(query, [id], (erro, resultados) => {
        if (erro) {
            console.log(erro)
            res.status(500).json({ message: 'Erro ao buscar pessoa.' }); // internal server erro
            return;
        }

        if (resultados.lenght == 0) {
            res.status(404).json({ message: 'Pessoa não encontrada.'}); // erro de digitação por parte do usuario
        }

        const pessoa = resultados[0];
        res.status(200).json({data: {id: pessoa.id, nome: pessoa.nome, sobrenome: pessoa.sobrenome, idade: pessoa.idade, peso: pessoa.peso}})
    })
})

app.listen(port, () => {
    console.log(`Servidor iniciado - porta ${port}`)
})