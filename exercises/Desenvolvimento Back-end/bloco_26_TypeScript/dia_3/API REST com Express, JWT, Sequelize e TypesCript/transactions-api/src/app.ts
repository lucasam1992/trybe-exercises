import express, { Request, Response } from 'express';
import transactionsRouter from './routers/transactions.router';

const app = express();

app.use(express.json());
app.use(transactionsRouter);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Aplicação está funcionando!');
});

export default app;
