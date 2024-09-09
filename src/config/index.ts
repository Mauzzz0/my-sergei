import dotenv from 'dotenv';

import { validate } from '../validation';
import { ConfigDto } from './config.dto';

dotenv.config();

const config = validate(ConfigDto, process.env);

export default config;
