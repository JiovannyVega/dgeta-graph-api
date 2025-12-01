import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class AuthPayload {
    @Field()
    accessToken!: string;

    @Field({ nullable: true })
    refreshToken?: string;

    @Field(() => User)
    user!: User;
}
