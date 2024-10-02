import 'reflect-metadata';

import express from 'express';

import { logRoutes } from './bootstrap';
import config from './config';
import { logMiddleware } from './middlewares';
import { errorHandler } from './middlewares/error.handler';
import { SessionMiddleware } from './middlewares/session.middleware';
import { taskController } from './modules/task/task.module';
import { userController } from './modules/user/user.module';
import { setupSwagger } from './swagger/setupSwagger';

export const bootstrap = async () => {
  const server = express();

  server.use(express.json());
  server.use(SessionMiddleware);
  server.use(logMiddleware);

  server.use('/task', taskController.router);
  server.use('/user', userController.router);

  logRoutes(server);
  setupSwagger(server);

  server.use(errorHandler);

  const port = config.port;

  server.listen(port, () => console.log(`Сервер запущен. Порт: ${port}`));
};

bootstrap();
