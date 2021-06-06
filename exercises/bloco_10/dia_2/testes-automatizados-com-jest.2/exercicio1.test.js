const uppercase = (str, callback) => {
    callback(str.toUpperCase());
  };

  it(`Exercicio1`, (done) =>{
    uppercase('test', (str) =>{
        expect(str).toBe('TEST');
        done();
    });
  });


  