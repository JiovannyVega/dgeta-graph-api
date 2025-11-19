import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [User, Role] })],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule { }
