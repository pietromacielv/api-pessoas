const mysql = require('mysql2')

// Criando uma conexão com o banco de dados para atualizar pessoas
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3000',
    password: '12345',
    database: 'lista_pessoas'
});

module.exports = conexao