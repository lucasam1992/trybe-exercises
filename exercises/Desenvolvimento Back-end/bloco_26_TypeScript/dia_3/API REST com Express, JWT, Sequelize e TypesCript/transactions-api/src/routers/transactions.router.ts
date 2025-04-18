import { Router } from 'express';
import transactionsController from '../controllers/transactions.controller';

const transactionsRouter = Router();

transactionsRouter.get('/transactions', transactionsController.list);
transactionsRouter.get('/transactions/:id', transactionsController.listById);
transactionsRouter.post('/transactions', transactionsController.create);

export default transactionsRouter;