import 'reflect-metadata';

import express from 'express';

import { privateGuard } from './guard/private.guard';
import { logMiddleware } from './middlewares';
import { errorHandler } from './middlewares/error.handler';
import { TaskController } from './modules/task/task.controller';

const server = express();

server.use(express.json());
server.use(logMiddleware);
server.use(privateGuard);

server.get('/task/:id', TaskController.getById);
server.post('/task', TaskController.create);

server.use(errorHandler);

server.listen(2000, () => console.log('Сервер запущен!'));
