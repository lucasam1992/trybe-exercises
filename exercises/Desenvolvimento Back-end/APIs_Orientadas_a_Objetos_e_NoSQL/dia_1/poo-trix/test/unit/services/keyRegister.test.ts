import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IKey  from '../../../src/Interface/IKey';
import Key from '../../../src/Domain/Key/Key';
import KeyService from '../../../src/Services/KeyService';

const RESULT_ERROR = 'Invalid Key';

describe('Deveria validar e criar chaves', () => {
    it('Criando uma chave do tipo CPF com sucesso', async () => {
        // Arrange
        const keyInput: IKey = {
            value: '478.966.190-32',
            owner: 'Jack C.',
            type: 'cpf',
        }
        const keyOutput: Key = new Key(
            '478.966.190-32',
            'Jack C.',
            'cpf',
            '633ec9fa3df977e30e993492'
        );

        sinon.stub(Model, 'create').resolves(keyOutput);

        // Act
        const service = new KeyService();
        const result = await service.register(keyInput);

        // Assert
        expect(result).to.be.deep.equal(keyOutput);
    });

    it('Criando uma chave do tipo CPF inválido', async () => {
        // Arrange
        const keyInput: IKey = {
            value: '478.966.190-32XX',
            owner: 'Jack C.',
            type: 'cpf',
        }

        sinon.stub(Model, 'create').resolves({});

        // Act
        try {
            const service = new KeyService();
            await service.register(keyInput);
        } catch (error) {
        // Assert
            expect((error as Error).message).to.be.equal(RESULT_ERROR);
        }
        
    });
    it('Criando uma chave do tipo TELEFONE com sucesso', async () => {
        const keyInput: IKey = {
            value: '+55 (18) 99999-5555',
            owner: 'Abreu L.',
            type: 'phonenumber',
        };
        const keyOutput: Key = new Key(
            '+55 (18) 99999-5555',
            'Abreu L.',
            'phonenumber',
            '633ec9fa3df977e30e993492'
        );

        sinon.stub(Model, 'create').resolves(keyOutput);

        const service = new KeyService();
        const result = await service.register(keyInput);

        expect(result).to.be.deep.equal(keyOutput);
    });
    it('Criando uma chave do tipo TELEFONE inválido', async () => {
        const keyInput: IKey = {
            value:'9999-5555',
            owner:'Abreu L.',
            type: 'phonenumber',
        };

        sinon.stub(Model, 'create').resolves({});
        
        try {
            const service = new KeyService();
            await service.register(keyInput);
        } catch(error) {
            expect((error as Error).message).to.be.equal(RESULT_ERROR);
        };
    });
    afterEach(() => {
        sinon.restore();
    });
});