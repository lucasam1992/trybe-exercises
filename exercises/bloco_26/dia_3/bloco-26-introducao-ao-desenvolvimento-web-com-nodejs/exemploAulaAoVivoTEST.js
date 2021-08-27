const { expect } = require('chai');
const sinon = require('sinon');
const readFile = require('./readFile');
const fs = require('fs').promises;

describe('Chama funcao para ser testada', () => {
    describe('quando o arquivo é lido com sucesso', ()=>{
        const CONTEXT_TEXT = 'oi, meu nome eh lucas';
        
        before(()=>{
            sinon.stub(fs,'readFile').resolves(CONTEXT_TEXT);
        });
        after(()=>{
            fs.readFile.restore();
        });

        describe('a resposta', () => {
            it('eh uma string', async () =>{
                const resultado = await readFile('./arquivoOO.txt');
                expect(resultado).to.be.a('string');
            });
            it('eh igual ao conteudo do arquivo', async () =>{
                const resultado = await readFile('./arquivoOO.txt');
                expect(resultado).to.be.equals(CONTEXT_TEXT);
            });
        });
    });

    describe('quando ocorrer um erro na leitura do arquivo', () => {
        before(()=>{
            sinon.stub(fs,'readFile').rejects(null);
        });
        after(()=>{
            fs.readFile.restore();
        });

        describe('a resposta', () => {
            it('eh igual a "null"', async () =>{
                const resultado = await readFile('./arquivoOO.md');
                expect(resultado).to.be.null;
            });
        });
    });
});
