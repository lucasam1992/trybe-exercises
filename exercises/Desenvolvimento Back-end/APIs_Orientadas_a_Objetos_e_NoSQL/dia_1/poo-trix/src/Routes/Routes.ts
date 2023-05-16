import { Router } from 'express';
import TransferController from '../Controllers/TransferController';
import KeyController from '../Controllers/KeyController';

const routes = Router();

routes.post('/transfer', (req, res, next) => new TransferController(req,res,next).create());
routes.post('/key/register', (req, res, next) => new KeyController(req, res, next).create());

export default routes;