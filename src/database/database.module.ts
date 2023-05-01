import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../config/configuration';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Restaurant',
    password: 'mysecretpassword',
    port: 5432,
  }),
};
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule { }
