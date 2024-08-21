import { Task } from './task.types';

const storage: Task[] = [];

export const TaskRepository = {
  getById(id: Task['id']): Task | undefined {
    return storage.find((x) => x.id === id);
  },

  create(task: Omit<Task, 'id'>): Task {
    const maxId = storage.sort((a, b) => (a.id < b.id ? 1 : -1))[0]?.id ?? 0;

    storage.push({ ...task, id: maxId + 1 });

    return storage[storage.length - 1];
  },
};
