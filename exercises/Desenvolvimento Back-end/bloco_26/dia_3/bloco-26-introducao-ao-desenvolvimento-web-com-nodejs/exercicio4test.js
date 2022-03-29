const fs = require('fs'); 
const sinon = require('sinon');
const { expect } = require('chai');

const writeFile = require('./exercicio4');

describe('Executa a funcao exercicio4', () => {
    //exercicio 5 - usando stub
    before(() =>{
        sinon.stub(fs,'writeFileSync');
    });
    after(() => {
        fs.writeFileSync.restore();// a função restore() que o sinon atribui aos stubs para retornarmos o comportamento padrão daquela função. 
    });

    describe(' a resposta', () => {
        it('é uma string', () => {
            const resposta = writeFile('arquivo.txt', '#vqv conteudo');

            expect(resposta).to.be.a('string');
        });

        it('é igual a "ok"', () => {
            const resposta = writeFile('arquivo.txt', '#vqv conteudo');

            expect(resposta).to.be.equals('ok');
        });
    });
});