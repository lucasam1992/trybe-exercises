const converterAlcoolAgua = require('./hydrate.js');

describe('Testar a função', () => {
    it('testa se existe funcção', () => {
        expect(converterAlcoolAgua).toBeDefined();
    });
    it('testa se é funcao', () => {
        expect(typeof converterAlcoolAgua).toBe('function');
    });
    it('respostas q a funcao deve retornar', () => {
        expect(converterAlcoolAgua('1 cerveja')).toBe('1 copo de água');
        expect(converterAlcoolAgua('1 cachaça, 5 cervejas e 1 copo de vinho')).toBe('7 copos de água');
        expect(converterAlcoolAgua('2 shots de tequila, 2 cervejas e 1 corote')).toBe('5 copos de água');
        expect(converterAlcoolAgua('1 copo de catuaba, 1 cervejas e 1 copo de vinho')).toBe('3 copos de água');
        expect(converterAlcoolAgua('4 caipirinhas e 2 cervejas')).toBe('6 copos de água');

    });
});