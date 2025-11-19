import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repo: EntityRepository<User>,
        @InjectRepository(Role)
        private readonly roleRepo: EntityRepository<Role>,
    ) { }

    findAll() {
        return this.repo.findAll();
    }

    findOne(id: number) {
        return this.repo.findOne({ user_id: id });
    }

    async create(input: { username: string; password: string; email: string; roleId: number }) {
        // check for existing username/email and fail early with clear message
        const existing = await this.repo.findOne({ $or: [{ username: input.username }, { email: input.email }] });
        if (existing) {
            if (existing.username === input.username) throw new BadRequestException('username already exists');
            if (existing.email === input.email) throw new BadRequestException('email already exists');
            // fallback
            throw new BadRequestException('user already exists');
        }
        const role = await this.roleRepo.findOne({ role_id: input.roleId });
        if (!role) throw new NotFoundException('role not found');
        const hashed = await bcrypt.hash(input.password, 10);
        const e = new User();
        e.username = input.username;
        e.password_hash = hashed;
        e.email = input.email;
        e.role = role;
        await this.repo.getEntityManager().persistAndFlush(e);
        return e;
    }

    async update(id: number, input: { username?: string; email?: string; roleId?: number }) {
        const e = await this.repo.findOneOrFail({ user_id: id });
        if (input.roleId) {
            const role = await this.roleRepo.findOne({ role_id: input.roleId });
            if (!role) throw new NotFoundException('role not found');
            e.role = role;
        }
        if (input.username) e.username = input.username;
        if (input.email) e.email = input.email;
        await this.repo.getEntityManager().flush();
        return e;
    }

    async remove(id: number) {
        const e = await this.repo.findOneOrFail({ user_id: id });
        await this.repo.getEntityManager().removeAndFlush(e);
        return { ok: true };
    }
}
