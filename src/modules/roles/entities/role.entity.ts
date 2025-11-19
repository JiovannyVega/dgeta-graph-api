import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity({ tableName: 'roles' })
@ObjectType()
export class Role {
    @Field(() => ID)
    @PrimaryKey()
    role_id!: number;

    @Field()
    @Property({ unique: true })
    role_name!: string;

    @Field({ nullable: true })
    @Property({ type: 'text', nullable: true })
    description?: string;
}
