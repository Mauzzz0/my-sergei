import { ConfigDto } from './dto';

type EnvStructure<T = any> = {
  [Key in keyof T]: T[Key] extends object ? EnvStructure<T[Key]> : string | undefined;
};

const configMap = (): EnvStructure<ConfigDto> => ({
  port: process.env.PORT,
  postgres: {
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    username: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
  },
});

export default configMap;
