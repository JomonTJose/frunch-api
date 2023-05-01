import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import configuration, { PG_CONNECTION } from '../config/configuration';
import { ConfigService } from '@nestjs/config';

let config = new ConfigService();
console.log(config);
const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'vvyswtkj',
    host: 'kandula.db.elephantsql.com',
    database: 'vvyswtkj',
    password: 'n7qAXaPsRpgT_yNKBv5DjzFCnBzzgbS9',
    port: 5432,
    ssl: false,
  }),
};

const pgClient = dbProvider.useValue.connect();
pgClient.then(() => {
  console.log("Connected")
}).catch((err) => {
  console.log("error" + err);
})
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule { }
