import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IPayment from '../../../src/Interface/IPayment';
import TransferService from '../../../src/Services/TransferService';
import Key from '../../../src/Domain/Key/Key';

describe('Lançando exceção ao tentar alterar um TRIX', function () {
  it('Deveria lançar uma exceção quando a key é inválida', async function () {
    const paymentInput: IPayment = {
      payByPerson: 'Pedrão',
      payToPerson: 'Juju',
      amount: 5000,
      key: '858.898.670-16XX',
    };
    sinon.stub(Model, 'update').resolves();
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      const service = new TransferService();
      await service.undoTransfer('63320b77aa12f0db4f210b00', paymentInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Key not found');
    }
  });

  it('Deveria lançar uma exceção quando o id é inválido', async function () {
    const paymentInput: IPayment = {
      payByPerson: 'Pedrão',
      payToPerson: 'Juju',
      amount: 5000,
      key: '858.898.670-16',
    };
    const outputKey: Key = new Key(
      '858.898.670-16',
      'Juju',
      'cpf',
      '633ec9fa3df977e30e993492',
    );
    sinon.stub(Model, 'update').resolves();
    sinon.stub(Model, 'findOne').resolves(outputKey);
    
    try {
      const service = new TransferService();
      await service.undoTransfer('WRONG ID', paymentInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid Mongo id');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});