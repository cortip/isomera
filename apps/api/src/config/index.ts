import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { dbConfigPg } from './database';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

interface ConfigInterface {
  port: number;
  database: PostgresConnectionOptions | SqliteConnectionOptions;
  keys: {
    privateKey: string;
    publicKey: string;
  };
}

export default (): Partial<ConfigInterface> => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  keys: {
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
    publicKey: process.env.PUBLIC_KEY.replace(/\\n/gm, '\n'),
  },
  database: dbConfigPg(),
});
