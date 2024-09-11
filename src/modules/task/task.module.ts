import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

const repository = new TaskRepository('tasks.json');
const service = new TaskService(repository);
export const taskController = new TaskController(service);
