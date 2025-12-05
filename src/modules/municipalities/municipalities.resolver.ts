import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { MunicipalitiesService } from './municipalities.service';
import { Municipality } from './entities/municipality.entity';
import { Public } from '../../common/decorators/public.decorator';

@Resolver(() => Municipality)
export class MunicipalitiesResolver {
    constructor(private readonly svc: MunicipalitiesService) { }

    @Public()
    @Query(() => [Municipality])
    municipalities(
        @Args('stateId', { type: () => Int, nullable: true }) stateId?: number,
    ) {
        if (stateId) {
            return this.svc.findByState(stateId);
        }
        return this.svc.findAll();
    }

    @Public()
    @Query(() => Municipality, { nullable: true })
    municipality(@Args('id', { type: () => Int }) id: number) {
        return this.svc.findOne(id);
    }
}
