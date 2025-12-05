import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { StatesSeeder } from './StatesSeeder';

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        return this.call(em, [
            StatesSeeder,
            // Add more seeders here as you create them
        ]);
    }
}
