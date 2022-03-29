const sorteio = (numeroAPostado, checaNUmero) => {
    const numero = Math.floor((Math.random()*5)+1);
    return checaNUmero(numeroAPostado,numero) ? 'Parabéns, você ganhou' : 'Tente novamente';
};

const checaNUmero = (numeroAPostado, sorteio) => numeroAPostado === sorteio;

console.log(sorteio(2,checaNUmero)); 