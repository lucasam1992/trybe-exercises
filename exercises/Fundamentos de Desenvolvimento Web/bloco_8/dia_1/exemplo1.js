const repeat = (number, action) => {
    for (let count = 0; count <= number; count += 1) {
      action(count);
    }
  };
  
  repeat(5, console.log);

  //parte 2
  
  repeat(3, (number) => {
    if (number % 2 === 0) {
      console.log(number, 'is even');
    }
  });

  //parte 3

  const repeat = (number, action) => {
    for (let count = 0; count <= number; count += 1) {
      action(count);
    }
  };
  
  const isEven = (number) => {
    if (number % 2 === 0) {
      console.log(number, 'is even');
    }
  };
  
  const isOdd = (number) => {
    if ((number % 2) > 0) {
      console.log(number, 'is odd');
    }
  };
  
  repeat(3, isEven); // Testa quais números serão pares;
  repeat(3, isOdd); // Testa quais números serão ímpares;

  
//parte 4

const greaterThan = (firstNumber) => (secondNumber) => secondNumber > firstNumber;

const greaterThan10 = greaterThan(10);
console.log(greaterThan10(15));
// true

//parte 5

// Ao chamarmos a função desta forma:
const greaterThan10 = greaterThan(10);

// Na prática é a mesma coisa que realizar assim:
const greaterThan10 = (secondNumber) => {
  return secondNumber > 10; // O parâmetro nomeado como "firstNumber" foi ocupado;
};

console.log(greaterThan10(15));

// Retornando o nosso resultado abaixo:
// true