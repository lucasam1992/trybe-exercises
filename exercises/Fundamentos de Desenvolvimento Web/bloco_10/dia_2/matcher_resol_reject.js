// Matcher
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


//.resolves espera a promise ser resolvida. Caso a promise seja rejeitada, o teste automaticamente irá falhar
//.rejects espera a promise ser rejeitada. Caso a promise seja resolvida, o teste automaticamente irá falhar

//Com promise:

describe('Testando promise - findAnimalsByType', () => {
    describe('Quando o tipo do animal existe', () => {
        test('Retorne a lista de animais', () => {
            const listDogs = [
                {name: 'Dorminhoco', age: 1, type: 'Dog'},
                {name: 'Soneca', age: 2, type: 'Dog'},
            ]
            expect.assertions(1);
            return expect(getListAnimals('Dog')).resolves.toEqual(listDogs)
        });
    });

    describe('Quando o tipo de animal não existe', () => {
        test('Retorna um erro', () => {
            expect.assertions(1);
            return expect(getListAnimals('Lion')).rejects.toEqual({error: 'Não possui esse tipo de animal.'})
        });
    });
});

//Com Async/Await

describe('Testando com Async/Await - findANimalsByType', () =>{
    describe('Quando o tipo de animal existe', () => {
        test('Retorna a lista de animais', async () => {
            const listDogs = [
                { name: 'Dorminhoco', age: 1, type: 'Dog' },
                { name: 'Soneca', age: 2, type: 'Dog' },
            ]
            expect.assertions(1);
            await expect(getListAnimals('Dog')).resolves.toEqual(listDogs)
        });
    });

    describe('Quando o tipo de animal não existe', () => {
        test('Retorna um erro', async () => {
            expect.assertions(1);
            await expect(getListAnimals('Lion')).rejects.toEqual({error: 'Não possui esse tipo de animal.'})
        });
    })
});