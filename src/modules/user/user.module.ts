import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const repository = new UserRepository('users.json');
const service = new UserService(repository);
export const userController = new UserController(service);
