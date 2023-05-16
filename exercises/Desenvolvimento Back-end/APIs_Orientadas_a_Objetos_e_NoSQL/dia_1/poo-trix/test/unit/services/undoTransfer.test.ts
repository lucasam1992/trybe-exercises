import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IPayment from '../../../src/Interface/IPayment';
import TransferService from '../../../src/Services/TransferService';

describe('Lançando exceção ao tentar alterar um TRIX', ()=> {
    it('Deveria lançar uma exceção quando a Key for inválida', async () => {
        const paymentInput: IPayment ={
            payByPerson: 'Pedrão',
            payToPerson: 'Juca',
            amount: 5000,
            key: '858.898.670-16XY',
        };
        sinon.stub(Model, 'update').resolves();

        try {
            const service = new TransferService();
            await service.undoTransfer('63320b77aa12f0db4f210b00', paymentInput);
        } catch (error) {
            expect((error as Error).message).to.be.equal('Invalid Key!');
        }
    });
    
    it('Deveria lançar uma exceçãoquando o id é inválido', async () => {
        const paymentInput: IPayment = {
            payByPerson: 'Pedrão',
            payToPerson: 'Juca',
            amount: 5000,
            key: '858.898.670-16',
        }
        
        sinon.stub(Model, 'update').resolves();

        try {
            const service = new TransferService();
            await service.undoTransfer('WRONG ID', paymentInput);
        } catch(error) {
            expect((error as Error).message).to.be.equal('Invalid Mongo id');
        }
    });

    afterEach(() => {
        sinon.restore();
    });
});