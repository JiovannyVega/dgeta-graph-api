import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { State } from '../modules/states/entities/state.entity';
import { Municipality } from '../modules/municipalities/entities/municipality.entity';
import * as statesData from '../../docs/db/states-municipalitys.json';

export class StatesSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        // Check if data already exists
        const existingCount = await em.count(State);
        if (existingCount > 0) {
            console.log('⚠️  States already seeded. Skipping...');
            return;
        }

        console.log('🌱 Seeding states and municipalities...');

        for (const [stateName, stateData] of Object.entries(statesData)) {
            // Skip if not an object with municipalities array
            if (typeof stateData !== 'object' || !Array.isArray(stateData.municipalities)) {
                continue;
            }

            // Create state
            const state = new State();
            state.name = stateName;
            state.code = stateData.code || undefined; // INEGI code as number
            state.abbreviation = stateData.abbreviation || undefined; // e.g., "JAL"
            em.persist(state);

            // Flush to get the generated state_id
            await em.flush();

            // Create municipalities for this state
            for (const municipalityName of stateData.municipalities) {
                const municipality = new Municipality();
                municipality.name = municipalityName;
                municipality.state = state;
                em.persist(municipality);
            }

            console.log(`✅ ${stateName} (${stateData.code}/${stateData.abbreviation}): ${stateData.municipalities.length} municipalities`);
        }

        await em.flush();
        console.log('✨ Seeding completed!');
    }
}
