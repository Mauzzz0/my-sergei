import { ConfigDto } from './config.dto';

type EnvStructure<T = any> = {
  [Key in keyof T]: T[Key] extends object ? EnvStructure<T[Key]> : string | undefined;
};

const configMap = (): EnvStructure<ConfigDto> => ({
  port: process.env.PORT,
  token: process.env.TELEGRAM_TOKEN,
});

export default configMap;
