const readline = require('readline-sync');


function advinhaNumero(){
    const numCPU = 5;
    const numUser = readline.questionInt("Tente advinhar o numero:");

    if(numCPU !== numUser){
        console.log(`Voce errou! O numero correto eh ${numCPU}`);
    }else{
    console.log(`Parabéns, número correto!`);
    }
    advinhaNumero();
}

advinhaNumero();



