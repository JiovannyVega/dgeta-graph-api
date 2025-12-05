import { defineConfig } from '@mikro-orm/mysql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import * as dotenv from 'dotenv';
import { User } from './modules/users/entities/user.entity';
import { Role } from './modules/roles/entities/role.entity';
import { RefreshToken } from './modules/auth/entities/refresh-token.entity';
import { State } from './modules/states/entities/state.entity';
import { Municipality } from './modules/municipalities/entities/municipality.entity';

// Load environment variables
dotenv.config();

export default defineConfig({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    entities: [Role, User, RefreshToken, State, Municipality],
    migrations: {
        path: './src/migrations',
    },
    seeder: {
        path: './src/seeders',
        defaultSeeder: 'DatabaseSeeder',
        glob: '!(*.d).{js,ts}',
        emit: 'ts',
        fileName: (className: string) => className,
    },
    extensions: [Migrator, SeedManager],
    debug: process.env.NODE_ENV !== 'production',
});
