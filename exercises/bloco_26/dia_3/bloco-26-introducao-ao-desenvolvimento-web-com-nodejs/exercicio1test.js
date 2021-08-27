const { expect } = require('chai');
const numNatural = require('./numeroNatural');

describe('Executa a funcao numNatural', () => {
    describe('quando num > 0', () => {
        describe(' resposta', () =>{
            it('é uma string', () =>{
                const resposta = numNatural(10);

                expect(resposta).to.be.a('string');
            });

            it('é positivo', () => {
                const resposta = numNatural(10);

                expect(resposta).to.be.equals('positivo');
            });
        });
    });

    describe('quando num < 0', () =>{
        describe(' resposta ', () =>{
            it('é uma string', () => {
                const resposta = numNatural(-10);

                expect(resposta).to.be.a('string');
            });

            it('é negativo', () => {
                const resposta = numNatural(-10);

                expect(resposta).to.be.equals('negativo');
            });
        });
    });

    describe('quando num === 0', () =>{
        describe('a resposta', () =>{
            it('é uma string', () => {
                const resposta = numNatural(0);

                expect(resposta).to.be.a('string');
            });

            it('é iguala "neutro"', () =>{
                const resposta = numNatural(0);

                expect(resposta).to.be.equals('neutro');
            });
        });
    });

    describe('testando se valor nao é number', () =>{
        describe('a resposta', () => {
            it('é uma string', () => {
                const resposta = numNatural('kasdced');

                expect(resposta).to.be.a('string');
            });

            it('é igual a "o parametro deve ser um numero"', () => {
                const resposta = numNatural('kasdced');

                expect(resposta).to.be.equals('o parametro deve ser um numero');
            })
        })
    })
});