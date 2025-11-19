import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
    @Field()
    username!: string;

    @Field()
    email!: string;

    @Field()
    password!: string;

    @Field(() => Int, { nullable: true })
    roleId?: number;
}
