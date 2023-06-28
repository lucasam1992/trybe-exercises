import { Request, Response } from 'express';
import transactionsService from '../services/transactions.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response) {
  const { name, price, type, userId } = req.body;
  const serviceResponse = await transactionsService.create({ name, price, type, userId });

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  res.status(201).json(serviceResponse.data);
}

async function list(_req: Request, res: Response) {
  const serviceResponse = await transactionsService.list();

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  res.status(200).json(serviceResponse.data);
}

async function listById(req: Request, res: Response) {
  const { id } = req.params;

  const serviceResponse = await transactionsService.listById(Number(id));

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default { 
  create,
  list,
  listById,
};