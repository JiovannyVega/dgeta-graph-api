import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { State } from '../../states/entities/state.entity';

@Entity({ tableName: 'municipalities' })
@ObjectType()
export class Municipality {
    @Field(() => ID)
    @PrimaryKey()
    municipality_id!: number;

    @Field(() => State)
    @ManyToOne(() => State)
    state!: State;

    @Field()
    @Property({ length: 100 })
    name!: string;
}
