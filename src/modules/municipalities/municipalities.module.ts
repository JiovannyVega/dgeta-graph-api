import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Municipality } from './entities/municipality.entity';
import { MunicipalitiesService } from './municipalities.service';
import { MunicipalitiesResolver } from './municipalities.resolver';

@Module({
    imports: [MikroOrmModule.forFeature([Municipality])],
    providers: [MunicipalitiesService, MunicipalitiesResolver],
    exports: [MunicipalitiesService],
})
export class MunicipalitiesModule { }
