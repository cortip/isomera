import dotenv from 'dotenv';
import {DataSource} from 'typeorm';
import {join} from "path";

// Load env file
dotenv.config();

const AppDataSource = new DataSource({
  type: process.env.TYPEORM_DRIVER as never,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number(process.env.TYPEORM_PORT),
  synchronize: process.env.TYPEORM_SYNCRONIZE === "true",
  entities: [join(__dirname, "../**/entities/*.entity.ts")],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')]
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

export default AppDataSource;
