import { TaskRepository } from './task.repository';
import { Task } from './task.types';

export const TaskService = {
  getById(id: Task['id']) {
    const task = TaskRepository.getById(id);

    if (!task) {
      throw Error(`Задача [${id}] не найдена!`);
    }

    return task;
  },

  create(dto: Omit<Task, 'id'>) {
    return TaskRepository.create(dto);
  },
};
