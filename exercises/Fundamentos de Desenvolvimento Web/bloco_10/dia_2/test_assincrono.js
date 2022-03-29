//callbacks

//gera um falso-positivo - a frase 'Deveria falhar!' sequer aparece no console

test("Não deveria passar!", ()=>{
    setTimeout(()=>{
        expect(10).toBe(5);
        console.log('Deveria falhar!');
    }, 500);
});

// mesmo teste, porém com a função done() - Passou - Jest consegue identificar o erro

test("Não deveria passar!", done =>{
    setTimeout(() => {
        expect(10).toBe(5);
        console.log('Deveria Falhar')
        done();
    }, 500);
});

// outro exemplo para fixar melhor:

const SumNumbers =(a,b, callback) => {
    setTimeout(() =>{
        const result =a + b;
        callback(result);
    }, 500)
}

test('Testando SumNumbers, soma 5 mais 10', done =>{
    SumNumbers(5, 10, (result) => {
        expect(result).toBe(15);
        done();
    });
})

//Promises

const Animals = [
    { name: 'Dorminhoco', age: 1, type: 'Dog' },
    { name: 'Soneca', age: 2, type: 'Dog' },
    { name: 'Preguiça', age: 5, type: 'Cat' },
  ];

  const findAnimalsByType = (type) => (
      new Promise((resolve, reject) =>{
          setTimeout(() =>{
              const arrayAnimals = Animals.filter((animal) => animal.type === type);
              if(arrayAnimals.length !== 0){
                  return resolve(arrayAnimals);
              }
              return reject({ error: 'Não possui esse tipo de animal.'});
          }, 100);
      })
  );

  const getListAnimals = (type) => (
    findAnimalsByType(type).then(list => list)
  );

// teste verifica se ao chamar a função getListAnimals com Dog como parametro, o seu retorno será 
//dois cachorros do array Animals

describe('Quando o tipo de animal existe', ()=> {
    test('Retorne a lista de animais', () => {
        expect.assertions(2);
        return getListAnimals('Dog').then(listDogs => {
            expect(listDogs[0].name).toEqual('Dorminhoco');
            expect(listDogs[1].name).toEqual('Soneca');
        });
    });
});

//teste o caso de erro 

describe('Quando o tipo de animal não existe', () => {
    test('Retorne a lista de animais', () => {
        return getListAnimals('Lion').catch(error =>
          expect(error).toEqual({error: "Não possui esse tipo de animal."})  
        );
    })
});

// Async/Await
// neste caso foi usado o mesmo programa anterior (findAnimals ...)

test('Testando com async/await', async () => {
    const listDogs = await getListAnimals('Dog');
    expect(listDogs[0].name).toEqual('Dorminhoco');
    expect(listDogs[1].name).toEqual('Soneca');
});

// abaixo código do reject da promise

test('Testando com async/await, testando o reject', async () => {
    try{
        await getListAnimals('Lion');
    }catch (error) {
        expect(error).toEqual({error: "Não possui esse tipo de animal."})
    }
});























