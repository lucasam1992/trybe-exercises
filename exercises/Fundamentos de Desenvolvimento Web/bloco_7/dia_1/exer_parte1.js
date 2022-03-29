const testingScope = escopo => {
    if (escopo === true) {
      var ifScope = 'Não devo ser utilizada fora do meu escopo (if)';
      ifScope = `${ifScope}  ótimo, fui utilizada no escopo !`;
      console.log(ifScope);
    } else {
      var elseScope = 'Não devo ser utilizada fora meu escopo (else)';
      console.log(elseScope);
    }
  }

  testingScope(false);



  const oddsAndEvens = [13, 3, 4, 10, 7, 2];

// Seu código aqui.
const sortOddsAndEvens = () => {
    oddsAndEvens[0] = 2;
    oddsAndEvens[1] = 3;
    oddsAndEvens[2] = 4;
    oddsAndEvens[3] = 7;
    oddsAndEvens[4] = 10;
    oddsAndEvens[5] = 13;

    return oddsAndEvens;
}

//exer2

const sortedArray = sortOddsAndEvens();

console.log(`Os numeros ${sortedArray} se encontram ordenados de forma crescebnte!`);




const oddsAndEvens = [13, 3, 4, 10, 7, 2]; 

const sortArrayBonus = array => {
    const sortOddsAndEvens = array.sort((a,b) => a - b);
    return sortOddsAndEvens;
}
const sortedArrayBonus = sortArrayBonus(oddsAndEvens);
console.log(`Os numeros ${sortedArrayBonus} se encontram ordenados de forma crescente!`);

const oddsAndEvens = [13, 3, 4, 10, 7, 2];

console.log(`Os números ${oddsAndEvens.sort((a, b) => a - b)} se encontram ordenados de forma crescente !`);