function calcImc(){
    const peso = 100;
    const altura = 190;

    console.log(`Peso:${peso}, Altura:${altura}`);
    const imc = (peso/Math.pow(altura/100,2)).toFixed(2);
    console.log(`IMC:${imc}`);
}

calcImc();


