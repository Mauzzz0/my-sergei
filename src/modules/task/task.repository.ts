import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import { Task } from './task.types';

let storage: Task[] = [];

const filename = 'tasks.json';
const writeStorageToFile = () => writeFileSync(filename, JSON.stringify(storage));

if (existsSync(filename)) {
  storage = JSON.parse(readFileSync(filename, 'utf-8'));
} else {
  writeStorageToFile();
}

export const TaskRepository = {
  getById(id: Task['id']): Task | undefined {
    return storage.find((x) => x.id === id);
  },

  create(task: Omit<Task, 'id'>): Task {
    const maxId = storage.sort((a, b) => (a.id < b.id ? 1 : -1))[0]?.id ?? 0;

    storage.push({ ...task, id: maxId + 1 });
    writeStorageToFile();

    return storage[storage.length - 1];
  },
};
