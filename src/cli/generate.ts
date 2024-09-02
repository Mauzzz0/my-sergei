import 'reflect-metadata';

import { TaskRepository } from '../modules/task/task.repository';
import { validate } from '../validation';
import { GenerateCommandOptions } from './dto';
import { words } from './mock.values';
import { getRandomItems } from './utils';

const { count } = validate(GenerateCommandOptions, { count: process.argv[2] });

console.log(`Передана команда для генерации ${count} задач`);

for (let i = 0; i < count; i++) {
  const title = getRandomItems(words, 3).join(' ');
  const description = getRandomItems(words, 10).join(' ');

  TaskRepository.create({ title, description });
}
