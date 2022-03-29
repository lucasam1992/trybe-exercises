const greetPeople = (people) => {
    let greeting = [];
  
    for (const index in people) {
        greeting.push(`Hello ${people[index]}`);
    }
    return greeting;
  };

const parameter = ['Irina', 'Ashleigh', 'Elsa'];
const result = ['Hello Irina', 'Hello Ashleigh', 'Hello Elsa'];

const assert = require('assert');
assert.strictEqual( typeof greetPeople, 'function');
  
const saida = greetPeople(parameter);
assert.deepStrictEqual(saida,result);

