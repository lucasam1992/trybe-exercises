import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Key from '../../../src/Domain/Key/Key';
import KeyService from '../../../src/Services/KeyService';

describe('Deveria buscar uma chave por valor', () => {
    it('Deveria buscar uma chave por valor com sucesso', async () => {
        const keyOutput: Key = new Key(
            '+55 (18) 99765-1187',
            'Jô Soares',
            'phonenumber',
            '633ec9fa3df977e30e993492',
        );
        sinon.stub(Model, 'findOne').resolves(keyOutput);

        const service = new KeyService();
        const result = await service.getByValue('+55 (18) 99765-1187');

        expect(result).to.be.equal(keyOutput);

        sinon.restore();
    });
});