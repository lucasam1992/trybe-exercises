const User = require('../models/user');

const jwt = require('jsonwebtoken'); //

// a chave secreta sera usada para encriptar os dados do usuario
//apenas quem tem acesso a chave pode alterar ou criar token JWT
const secret ='seusecretdetoken'

module.exports = async (req, res) => {
  try {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });

  const user = await User.findUser(username);

  if (!user || user.password !== password)
    return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });

  
  const jwtConfig = {
    expiresIn: '7d', //tempo de validade do token = [7d= 7 dias]-[8h=8 horas]
    algorithm: 'HS256', 
  };

  //Aqui é quando assinamos de fato nossa mensagem com a secreta
  //Mensagem essa que contem dados do seu usuario e/ou demais dados q voce
  //quiser colocar dentro de "data"
  const token = jwt.sign({data:user}, secret, jwtConfig);

  return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};
