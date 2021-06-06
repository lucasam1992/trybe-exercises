const listaTecnologia = require('./techList.js');

describe('Teste a função da lista', () => {
    it('testa se funcao foi criada', () => {
        expect(listaTecnologia).toBeDefined();
    });
    it('testa se é uma função', () =>{
        expect(typeof listaTecnologia).toEqual('function');
    });
    it('Lista com 5 tecnologias e sua devida ordem alfabetica', () => {
        expect(listaTecnologia(['React', 'Jest', 'HTML', 'CSS', 'JavaScript'], 'Lucas')).toEqual([
            {
                tech: 'CSS',
                aluno: 'Lucas'
              },
              {
                tech: 'HTML',
                aluno: 'Lucas'
              },
              {
                tech: 'JavaScript',
                aluno: 'Lucas'
              },
              {
                tech: 'Jest',
                aluno: 'Lucas'
              },
              {
                tech: 'React',
                aluno: 'Lucas'
              }
        ]);
    });
    it('testa quando receber lista vazia', () => {
        expect(listaTecnologia([],'Lucas')).toEqual('Vazio');
    });
});

module.exports = listaTecnologia;