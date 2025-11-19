import { defineConfig } from '@mikro-orm/mysql';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    dbName: process.env.DB_NAME ?? 'dgeta',
    entities: ['./dist/modules/**/entities/*.js'],
    entitiesTs: ['./src/modules/**/entities/*.ts'],
    migrations: {
        path: './dist/migrations',
        pathTs: './src/migrations',
        glob: '!(*.d).{js,ts}',
    },
});
