import { Router } from 'express';
import express from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

//middleware de verificação de token para usar o sistema;
import authMiddleware from './app/middlewares/auth';

const routes = new Router();


routes.use(express.json());
routes.post('/users', UserController.store);
routes.post('/session' ,SessionController.store);


//As Rotas Abaixo so podem ser acessadas com token Validado
routes.use(authMiddleware);
routes.get('/recipients' ,RecipientsController.index);
routes.post('/recipients' ,RecipientsController.store);
routes.put('/recipients/:id' ,RecipientsController.update);
routes.delete('/recipients/:id' ,RecipientsController.delete);


export default routes;
