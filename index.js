import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
const router = express.Router();

//middlewares
app.use(cors());
app.use(express.json());
app.use(router);

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'willdev123',
  database: 'chat',
});

function getMessages(_, response) {
  const q = 'SELECT * FROM chat';
  database.query(q, (erro, data) => {
    if (erro) {
      return response.json(erro);
    }
    return response.status(200).json(data);
  });
}

function addMessages(req, res) {
  const q = 'INSERT INTO chat(content, horario, usuarioName) VALUES(?, ?, ?)';

  const valores = [req.body.content, req.body.horario, req.body.usuarioName];

  database.query(q, valores, (erro) => {
    if (erro) {
      console.log(`esse foi o essr ${erro}`);
    }

    return res.status(200).json('Inserção concluida - by backend');
  });
}

router.get('/', getMessages);
router.post('/', addMessages);

app.listen(8800);
