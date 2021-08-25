const readline = require('readline-sync');

function calcImc(){
    const peso = readline.questionFloat("Qual o seu peso?(em kg)");
    const altura = readline.questionInt("Qual a sua altura? (em cm)");

    console.log(`Peso:${peso}, Altura:${altura}`);
    const imc = (peso/Math.pow(altura/100,2)).toFixed(2);
    console.log(`IMC:${imc}`);

  if( imc < 18.5){
    console.log("Abaixo do peso (magreza)");
  }
  if(imc >= 18.5 && imc < 25){
    console.log("Peso normal ");
  }
  if(imc >= 25 && imc < 30){
    console.log("Acima do peso (sobrepeso) ");
  }
  if(imc >= 30 && imc < 35){
    console.log("Obesidade grau I ");
  }
  if(imc >= 35 && imc < 40){
    console.log("Obesidade grau II ");
  }
    console.log("Obesidade grau III e IV ");
}

calcImc();


