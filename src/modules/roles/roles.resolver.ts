import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
class CreateRoleInput {
    @Field()
    role_name!: string;

    @Field({ nullable: true })
    description?: string;
}

@InputType()
class UpdateRoleInput {
    @Field({ nullable: true })
    role_name?: string;

    @Field({ nullable: true })
    description?: string;
}

@Resolver(() => Role)
export class RolesResolver {
    constructor(private readonly svc: RolesService) { }

    @Query(() => [Role])
    roles() {
        return this.svc.findAll();
    }

    @Query(() => Role, { nullable: true })
    role(@Args('id', { type: () => Int }) id: number) {
        return this.svc.findOne(id);
    }

    @Mutation(() => Role)
    createRole(@Args('input') input: CreateRoleInput) {
        return this.svc.create(input as any);
    }

    @Mutation(() => Role)
    updateRole(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateRoleInput) {
        return this.svc.update(id, input as any);
    }

    @Mutation(() => Boolean)
    async deleteRole(@Args('id', { type: () => Int }) id: number) {
        await this.svc.remove(id);
        return true;
    }
}
