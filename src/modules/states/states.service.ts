import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { State } from './entities/state.entity';

@Injectable()
export class StatesService {
    constructor(
        @InjectRepository(State)
        private readonly repo: EntityRepository<State>,
    ) { }

    findAll() {
        return this.repo.findAll({ populate: ['municipalities'] });
    }

    findOne(id: number) {
        return this.repo.findOne({ state_id: id }, { populate: ['municipalities'] });
    }

    findByName(name: string) {
        return this.repo.findOne({ name }, { populate: ['municipalities'] });
    }
}
