// Sugestão de respostas a serem validadas.
const correctAnswer = 'higher order function';
const userAnswer = 'HIGHER ORDER FUNCTION';

const verificaSeMaiscula = (correctAnswer) => (userAnswer) => correctAnswer === userAnswer.toLowerCase();

console.log(verificaSeMaiscula(correctAnswer)(userAnswer));