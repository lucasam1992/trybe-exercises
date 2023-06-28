import TransactionModel, { 
  TransactionInputtableFields,
  TransactionSequelizeModel,
} from '../database/models/transaction.model';
import { Transaction } from '../types/Transaction';
import { ServiceResponse } from '../types/serviceResponse';

function validateParams({
  name, price, type, userId,
}: TransactionInputtableFields): string | null {
  if (!name) return 'name is required';
  if (!price) return 'price is required';
  if (!type) return 'type is required';
  if (!userId) return 'userId is required';

  return null;
}

async function create(
  transaction: TransactionInputtableFields,
)
  : Promise<ServiceResponse<Transaction>> {
  let responseService: ServiceResponse<Transaction>;

  const error = validateParams(transaction);

  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  const newTransaction = await TransactionModel.create(transaction);

  responseService = { status: 'SUCCESSFUL', data: newTransaction.dataValues };

  return responseService;
}

async function list(): Promise<ServiceResponse<TransactionSequelizeModel[]>> {
  const transactions = await TransactionModel.findAll();

  return { status: 'SUCCESSFUL', data: transactions };
}

async function listById(id: number): Promise<ServiceResponse<Transaction>> {
  const transaction = await TransactionModel.findByPk(id);

  let serviceResponse: ServiceResponse<Transaction>;

  if (!transaction) {
    serviceResponse = { status: 'NOT_FOUND', data: { message: 'Transaction not found' } };
    return serviceResponse;
  }

  serviceResponse = { status: 'SUCCESSFUL', data: transaction.dataValues };
  return serviceResponse;
}

export default {
  create,
  list,
  listById,
};