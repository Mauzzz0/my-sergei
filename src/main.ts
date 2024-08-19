import express from 'express';

import { logRoutes } from './log.routes';

const server = express();

server.use(express.json());

const port = 2000;

const userRouter = express.Router();

userRouter.get('/profile', (req, res) => {
  res.json({ id: 10, name: 'chris' });
});

userRouter.get('/:name', (req, res) => {
  res.json({ name: req.params.name });
});

server.use('/user', userRouter);

logRoutes(server);

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
