import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
class CreateUserInput {
    @Field()
    username!: string;

    @Field()
    password!: string;

    @Field()
    email!: string;

    @Field(() => Int)
    roleId!: number;
}

@InputType()
class UpdateUserInput {
    @Field({ nullable: true })
    username?: string;

    @Field({ nullable: true })
    email?: string;

    @Field(() => Int, { nullable: true })
    roleId?: number;
}

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly svc: UsersService) { }

    @Query(() => [User])
    users() {
        return this.svc.findAll();
    }

    @Query(() => User, { nullable: true })
    user(@Args('id', { type: () => Int }) id: number) {
        return this.svc.findOne(id);
    }

    @Mutation(() => User)
    createUser(@Args('input') input: CreateUserInput) {
        return this.svc.create(input as any);
    }

    @Mutation(() => User)
    updateUser(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateUserInput) {
        return this.svc.update(id, input as any);
    }

    @Mutation(() => Boolean)
    async deleteUser(@Args('id', { type: () => Int }) id: number) {
        await this.svc.remove(id);
        return true;
    }
}
