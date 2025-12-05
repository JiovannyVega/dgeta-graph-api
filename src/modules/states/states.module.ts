import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { State } from './entities/state.entity';
import { StatesService } from './states.service';
import { StatesResolver } from './states.resolver';

@Module({
    imports: [MikroOrmModule.forFeature([State])],
    providers: [StatesService, StatesResolver],
    exports: [StatesService],
})
export class StatesModule { }
