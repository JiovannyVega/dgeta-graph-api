import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? undefined,
    password: process.env.DB_PASSWORD ?? undefined,
    dbName: process.env.DB_NAME ?? undefined,
}));
