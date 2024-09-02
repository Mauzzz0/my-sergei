import { PaginationDto } from '../../shared/pagination.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.types';

export const TaskService = {
  getAll(pagination: PaginationDto) {
    const items = TaskRepository.getAll(pagination);

    return {
      total: TaskRepository.size(),
      limit: pagination.limit,
      offset: pagination.offset,
      items,
    };
  },
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
