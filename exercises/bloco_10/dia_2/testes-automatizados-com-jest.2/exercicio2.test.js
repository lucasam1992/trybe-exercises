const users = {
    4: { name: 'Mark' },
    5: { name: 'Paul' }
  };
  
  const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        if (users[id]) {
          return resolve(users[id]);
        }
  
        return reject({ error: 'User with ' + id + ' not found.' });
    });
  }
  
  const getUserName = (userID) => {
    return findUserById(userID).then(user => user.name);
  }


describe('testando a função get', () =>{
    describe('caso em que o Id é valido', () =>{
        it('retorna user.name', () =>{
            expect.assertions(1);
            return getUserName(4).then(data => expect(data).toEqual('Mark'));
        });
    })

describe('quando ai nao existir', () =>{
    it('erro', () =>{
        expect.assertions(1);
      return getUserName(2).catch(error =>
        expect(error).toEqual({ error: 'User with 2 not found.' })
      );
    });
  });
});













