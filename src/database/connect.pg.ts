import { Sequelize } from 'sequelize-typescript';

import config from '../config';
import { TaskModel, UserModel } from './models';

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
