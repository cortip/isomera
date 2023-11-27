import { config } from './typeorm.config'
import { DataSource, DataSourceOptions } from 'typeorm'

export default new DataSource(config as DataSourceOptions)
