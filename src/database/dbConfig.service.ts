import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";
import { PG_CONNECTION } from "src/config/configuration";

@Injectable()
export class DBConfigService {
    constructor(private configService: ConfigService) {
        provide: PG_CONNECTION;
        let pg = new Pool({
            user: this.configService.get<string>('POSTGRESQL_USERNAME'),
            host: this.configService.get<string>('POSTGRESQL_HOST'),
            database: this.configService.get<string>('POSTGRES_DB'),
            password: this.configService.get<string>('POSTGRESQL_PWD'),
            port: this.configService.get<number>('POSTGRESQL_PORT'),
            ssl: true,
        })

        pg.connect((error, pg) => {
            console.log('Connected Succ')
        })

        // const dbProvider = {
        //     provide: PG_CONNECTION,
        //     useValue: new Pool({
        //         user: this.configService.get<string>('POSTGRESQL_USERNAME'),
        //         host: this.configService.get<string>('POSTGRESQL_HOST'),
        //         database: this.configService.get<string>('POSTGRES_DB'),
        //         password: this.configService.get<string>('POSTGRESQL_PWD'),
        //         port: this.configService.get<number>('POSTGRESQL_PORT'),
        //         ssl: true,
        //     }),
        // };
    }
}