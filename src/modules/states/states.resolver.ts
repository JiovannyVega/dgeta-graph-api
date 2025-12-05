import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { StatesService } from './states.service';
import { State } from './entities/state.entity';
import { Public } from '../../common/decorators/public.decorator';

@Resolver(() => State)
export class StatesResolver {
    constructor(private readonly svc: StatesService) { }

    @Public()
    @Query(() => [State])
    states() {
        return this.svc.findAll();
    }

    @Public()
    @Query(() => State, { nullable: true })
    state(@Args('id', { type: () => Int }) id: number) {
        return this.svc.findOne(id);
    }
}
