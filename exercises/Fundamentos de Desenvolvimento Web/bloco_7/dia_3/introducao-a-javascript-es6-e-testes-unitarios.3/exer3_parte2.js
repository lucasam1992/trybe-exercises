const assert = require('assert');
// escreva a função sumAllNumbers aqui

const sumAllNumbers = (array) => {
    let somaTotal =0;
    for(let index=0; index < array.length; index+=1){
        somaTotal += array[index];
    }
    return somaTotal;
}

const numbers = [9, 23, 10, 3, 8];
const expected = 53;
const output = sumAllNumbers(numbers);

assert.strictEqual(typeof sumAllNumbers, 'function');
assert.strictEqual(output, expected);