import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IPayment from '../../../src/Interface/IPayment';
import PaymentStatus from '../../../src/utils/PaymentStatus';
import TransferService from '../../../src/Services/TransferService';
import Payment from '../../../src/Domain/Payment';
import Key from '../../../src/Domain/Key/Key';

describe('Deveria criar uma transferência TRIX', function () {
  it('Deveria criar uma transferência TRIX com SUCESSO', async function () {
    const cpf = '858.898.670-16';
    const paymentInput: IPayment = {
      payByPerson: 'Jobs',
      payToPerson: 'Wozniak',
      amount: 50000,
      key: cpf,
    };
    const outputPayment: Payment = new Payment(
      'Jobs',
      'Wozniak',
      50000,
      cpf,
      '63319d80feb9f483ee823ac5',
      PaymentStatus.concluded,
    );
    const outputKey: Key = new Key(
      cpf,
      'Wozniak',
      'cpf',
      '633ec9fa3df977e30e993492',
    );
    sinon.stub(Model, 'create').resolves(outputPayment);
    sinon.stub(Model, 'findOne').resolves(outputKey);

    const service = new TransferService();
    const result = await service.transfer(paymentInput);

    expect(result).to.be.deep.equal(outputPayment);
  });

  it('Deveria lançar uma exceção quando a key não existe', async function () {
    const paymentInput: IPayment = {
      payByPerson: 'Jobs',
      payToPerson: 'Wozniak',
      amount: 50000,
      key: '858.898.670-16XX',
    };

    sinon.stub(Model, 'create').resolves({});
    sinon.stub(Model, 'findOne').resolves(undefined);

    try {
      const service = new TransferService();
      await service.transfer(paymentInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Key not found');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});