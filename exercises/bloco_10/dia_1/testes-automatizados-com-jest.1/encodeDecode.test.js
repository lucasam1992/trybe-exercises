const {encode, decode} = require('./encodeDecode.js');

describe('Testa funcs', () =>{
    it('a função encode é definida', ()=>{
        expect(encode).toBeDefined();
    });

    it('encode é uma função', ()=>{
        expect(typeof encode).toEqual('function');
    });

    it('converte apenas a vogal "a" no numero 1', ()=>{
        expect(encode('ana')).toEqual('1n1');
    });

    it('converte apenas a vogal "e" no numero 2', ()=>{
        expect(encode('ele')).toEqual('2l2');
    });

    it('converte apenas a vogal "i" no numero 3', ()=>{
        expect(encode('xixi')).toEqual('x3x3');
    });

    it('converte apenas a vogal "o" no numero 4', ()=>{
        expect(encode('ovo')).toEqual('4v4');
    });

    it('converte apenas a vogal "u" no numero 5', ()=>{
        expect(encode('nus')).toEqual('n5s');
    });

    it('checa se o retorno da função tem o mesmo numero de caracteres', ()=>{
        expect(encode('trybe').length).toEqual(5);
    });

    it('a função decode é definida', ()=>{
        expect(decode).toBeDefined();
    });

    it('decode é uma função', ()=>{
        expect(typeof decode).toEqual('function');
    });

    it('converte apenas o numero "1" na letra "a"', ()=>{
        expect(decode('1n1')).toEqual('ana');
    });

    it('converte apenas o numero "2" na letra "e"', ()=>{
        expect(decode('2l2')).toEqual('ele');
    });

    it('converte apenas o numero "3" na letra "i"', ()=>{
        expect(decode('x3x3')).toEqual('xixi');
    });

    it('converte apenas o numero "4" na letra "o"', ()=>{
        expect(decode('4v4')).toEqual('ovo');
    });

    it('converte apenas o numero "5" na letra "u"', ()=>{
        expect(decode('n5s')).toEqual('nus');
    });

    it('checa se o retorno da função tem o mesmo numero de caracteres', ()=>{
        expect(decode('trybe').length).toEqual(5);
    });
});