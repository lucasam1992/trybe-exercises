import Payment from '../Domain/Payment';
import IPayment from '../Interface/IPayment';
import PaymentODM from '../Models/PaymentODM';
import KeyService from './KeyService';

class TransferService {
  private createPaymentDomain(payment: IPayment | null): Payment | null {
    if (payment) {
      return new Payment(
        payment.payByPerson,
        payment.payToPerson,
        payment.amount,
        payment.key,
        payment.id,
        payment.status,
      );
    }
    return null;
  }

  public async transfer(payment: IPayment) {
    const keyService = new KeyService();
    if (await keyService.getByValue(payment.key)) {
      const paymentODM = new PaymentODM();
      const newPayment = await paymentODM.create(payment);
      return this.createPaymentDomain(newPayment);
    }
    throw new Error('Key not found');
  }

  public async undoTransfer(id: string, payment: IPayment) {
    const keyService = new KeyService();
    if (await keyService.getByValue(payment.key)) {
      const paymentODM = new PaymentODM();
      return paymentODM.update(id, payment);
    }
    throw new Error('Key not found');
  }
}

export default TransferService;