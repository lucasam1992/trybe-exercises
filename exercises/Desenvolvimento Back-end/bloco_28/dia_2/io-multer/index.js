require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const { PORT } = process.env;

const controllers = require('./controllers');
const middlewares = require('./middlewares');

const app = express();

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/uploads'));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
  callback(null,'uploads');
  },
  filename: (req,file,callback) => {
    callback(null,file.originalname)
    callback(null, `${Date.now()}-${file.originalname}`) // faz com que nao sobreescreva o arquivo
  }
});

const upload = multer({storage});

//const upload = multer({dest: 'uploads'});

app.post('/files/upload', upload.single('file'), (req, res) =>
  res.status(200).json({body: req.body, file: req.file})
);

app.get('/ping', controllers.ping);

app.use(middlewares.error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
