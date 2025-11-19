import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly repo: EntityRepository<Role>,
    ) { }

    findAll() {
        return this.repo.findAll();
    }

    findOne(id: number) {
        return this.repo.findOne({ role_id: id });
    }

    async create(input: { role_name: string; description?: string }) {
        const e = new Role();
        e.role_name = input.role_name;
        if (input.description) e.description = input.description;
        await this.repo.getEntityManager().persistAndFlush(e);
        return e;
    }

    async update(id: number, input: { role_name?: string; description?: string }) {
        const e = await this.repo.findOneOrFail({ role_id: id });
        this.repo.assign(e, input as Partial<Role>);
        await this.repo.getEntityManager().flush();
        return e;
    }

    async remove(id: number) {
        const e = await this.repo.findOneOrFail({ role_id: id });
        await this.repo.getEntityManager().removeAndFlush(e);
        return { ok: true };
    }
}
