import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [Role] })],
    providers: [RolesService, RolesResolver],
    exports: [RolesService],
})
export class RolesModule { }
