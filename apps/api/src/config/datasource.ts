import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { dbConfigPg } from './database';

// Load env file
dotenv.config();

const AppDataSource = new DataSource(dbConfigPg());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
