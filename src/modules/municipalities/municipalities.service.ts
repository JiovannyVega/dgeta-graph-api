import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Municipality } from './entities/municipality.entity';

@Injectable()
export class MunicipalitiesService {
    constructor(
        @InjectRepository(Municipality)
        private readonly repo: EntityRepository<Municipality>,
    ) { }

    findAll() {
        return this.repo.findAll({ populate: ['state'] });
    }

    findOne(id: number) {
        return this.repo.findOne({ municipality_id: id }, { populate: ['state'] });
    }

    findByState(stateId: number) {
        return this.repo.find({ state: { state_id: stateId } });
    }
}
