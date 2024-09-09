import dotenv from 'dotenv';

import { validate } from '../validation';
import configMap from './config.map';
import { ConfigDto } from './dto';

dotenv.config();

const config = validate(ConfigDto, configMap());

export default config;
