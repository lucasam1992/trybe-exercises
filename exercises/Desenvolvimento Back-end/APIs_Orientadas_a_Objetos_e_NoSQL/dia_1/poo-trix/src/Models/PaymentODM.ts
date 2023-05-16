import { Model, Schema, model, models, UpdateQuery, isValidObjectId } from 'mongoose';
import IPayment from '../Interface/IPayment';

class PaymentODM {
    private schema: Schema;
    private model: Model<IPayment>;

    constructor() {
        this.schema = new Schema<IPayment>({
            payByPerson: { type: String, required: true},
            payToPerson: { type: String, required: true},
            amount: { type: Number, required: true},
            key: { type: String, required: true}
        });
        this.model = models.Payment || model('Payment', this.schema);
    }

    public async create(payment: IPayment): Promise<IPayment> {
        return this.model.create({...payment});
    }

    public async update(id: string, obj: Partial<IPayment>): Promise<IPayment | null> {
        if(!isValidObjectId(id)) throw Error('Invalid Mongo id');

        return this.model.findByIdAndUpdate(
            { _id: id},
            { ...obj } as UpdateQuery<IPayment>,
            { new: true},
        );
    }
}

export default PaymentODM;