import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'refresh_tokens' })
@ObjectType()
export class RefreshToken {
    @Field(() => ID)
    @PrimaryKey()
    id!: number;

    @Field()
    @Property({ unique: true, columnType: 'text' })
    token!: string;

    @Field(() => User)
    @ManyToOne(() => User)
    user!: User;

    @Field()
    @Property()
    created_at: Date = new Date();

    @Property({ nullable: true })
    expires_at?: Date;

    @Property({ default: false })
    revoked: boolean = false;
}
