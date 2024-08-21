const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const porta = 5000;

app.use(cors());
app.use(bodyParser.json());

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'escola'
});

conexao.connect((erro) => {
  if (erro) throw erro;
  console.log('Conectado ao banco de dados MySQL.');
});

// Rotas CRUD
app.get('/alunos', (req, res) => {
  conexao.query('SELECT * FROM alunos', (erro, resultados) => {
    if (erro) throw erro;
    res.json(resultados);
  });
});

app.post('/alunos', (req, res) => {
  const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;
  conexao.query('INSERT INTO alunos (nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala) VALUES (?, ?, ?, ?, ?, ?)',
    [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala],
    (erro) => {
      if (erro) throw erro;
      res.status(201).send('Aluno adicionado.');
    }
  );
});

app.put('/alunos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;
  conexao.query('UPDATE alunos SET nome = ?, idade = ?, nota_primeiro_semestre = ?, nota_segundo_semestre = ?, nome_professor = ?, numero_sala = ? WHERE id = ?',
    [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala, id],
    (erro) => {
      if (erro) throw erro;
      res.send('Aluno atualizado.');
    }
  );
});

app.delete('/alunos/:id', (req, res) => {
  const { id } = req.params;
  conexao.query('DELETE FROM alunos WHERE id = ?', [id], (erro) => {
    if (erro) throw erro;
    res.send('Aluno excluído.');
  });
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
