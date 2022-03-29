const Animals = [
    { name: 'Dorminhoco', age: 1, type: 'Dog' },
    { name: 'Soneca', age: 2, type: 'Dog' },
    { name: 'Preguiça', age: 5, type: 'Cat' },
  ];
  
  const findAnimalByName = (name) => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const arrayAnimal = Animals.find((animal) => animal.name === name);
        if (arrayAnimal) {
          return resolve(arrayAnimal);
        };
  
        return reject({ error: 'Não existe animal com esse nome.' });
      }, 100);
    })
  );
  
  const getAnimal = (name) => (
    findAnimalByName(name).then(name => name)
  );



  describe('Testando promise - findAnimalByName', () => {
    describe('Quando existe o animal com o nome procurado', () => {
      test('Retorne o objeto do animal', () => {
        expect.assertions(1);
        return getAnimal('Dorminhoco').then(animal => {
          expect(animal).toEqual({ name: 'Dorminhoco', age: 1, type: 'Dog' });
        });
      });
    });
  
    describe('Quando não existe o animal com o nome procurado', () => {
      test('Retorna um erro', () => {
        expect.assertions(1);
        return getAnimal('Bob').catch(error =>
          expect(error).toEqual('Não existe animal com esse nome.')
        );
      });
    });
  });