const readline = require('readline-sync');


function calcVelocidadeMedia(){
    const distancia = readline.questionFloat("Qual a distancia em metros");
    const tempo = readline.questionFloat("qual o tempo em segundos");
    
    console.log(`A distancia eh ${distancia}, o tempo eh ${tempo}`);
    
    const velocidadeMedia = distancia/tempo; 

    console.log(`A velocidade media eh: ${velocidadeMedia} m/s`);
}

calcVelocidadeMedia();