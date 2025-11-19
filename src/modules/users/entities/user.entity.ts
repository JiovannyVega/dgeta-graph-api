import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from '../../roles/entities/role.entity';

@Entity({ tableName: 'users' })
@ObjectType()
export class User {
    @Field(() => ID)
    @PrimaryKey()
    user_id!: number;

    @Field(() => Role)
    @ManyToOne(() => Role)
    role!: Role;

    @Field()
    @Property({ unique: true })
    username!: string;

    // do not expose password hash in GraphQL
    @Property({ columnType: 'varchar(255)' })
    password_hash!: string;

    @Field()
    @Property({ unique: true })
    email!: string;

    @Field({ nullable: true })
    @Property({ nullable: true })
    registered_at?: Date;

    @Field({ nullable: true })
    @Property({ nullable: true })
    last_login?: Date;

    @Field()
    @Property({ default: true })
    active: boolean = true;
}
