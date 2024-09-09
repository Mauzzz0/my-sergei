import dotenv from 'dotenv';

import { validate } from '../validation';
import { ConfigDto } from './config.dto';
import configMap from './config.map';

dotenv.config();

const config = validate(ConfigDto, configMap());

export default config;
