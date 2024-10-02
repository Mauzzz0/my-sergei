import { Sequelize } from 'sequelize-typescript';

import config from '../config';
import { UserModel } from './models';
import { TaskModel } from './models/task.model';

export const connectPg = async () => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    logging: false,
    models: [UserModel, TaskModel],
    ...config.postgres,
  });

  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
};
