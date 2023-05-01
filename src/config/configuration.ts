export const PG_CONNECTION = 'PG_CONNECTION';
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRESQL_HOST,
    port: parseInt(process.env.POSTGRESQL_PORT, 10) || 5432,
    userName: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PWD,
    databaseName: process.env.POSTGRES_DB,
  },
});
