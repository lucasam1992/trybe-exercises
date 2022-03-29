require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs'); //ira fazer a leitura de todos os arquivos da pasta uploads

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

const storage = multer.diskStorage({
  destination: (req, file, callback) => {callback(null, 'uploads')},
  filename: (req, file, callback) => {callback(null, `${Date.now()} -${file.originalname}`)}
})

// função para verificar a extensão do aquivo "upado"
const fileFilter = (req, file, cb) => {
  if(file.mimetype !== 'image/png') {
    req.fileValidationError = true; // colocar mensagem de erro na req

    return cb(null,false); //rejeitar arq
  }
  if(fileExists(file.originalname)){
    req.fileDuplicated = true;

    return cb(null, false);
  }

  cb(null, true);
} 

const fileExists = (filename) => {
  const files = fs.readdirSync(`${__dirname}/uploads`);
  return files.some(file => file === filename);
}

const upload = multer({storage});

app.get('/ping', controllers.ping);
app.post('/upload',upload.single('file'), controllers.upload);

app.use(middlewares.error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
