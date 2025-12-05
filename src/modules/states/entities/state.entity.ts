import { Entity, PrimaryKey, Property, Collection, OneToMany } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Municipality } from '../../municipalities/entities/municipality.entity';

@Entity({ tableName: 'states' })
@ObjectType()
export class State {
    @Field(() => ID)
    @PrimaryKey()
    state_id!: number;

    @Field()
    @Property({ length: 100 })
    name!: string;

    @Field({ nullable: true })
    @Property({ nullable: true })
    code?: number; // INEGI numeric code (1-32)

    @Field({ nullable: true })
    @Property({ length: 5, nullable: true })
    abbreviation?: string; // e.g., "JAL", "QROO", "NL"

    @Field(() => [Municipality], { nullable: true })
    @OneToMany(() => Municipality, municipality => municipality.state)
    municipalities = new Collection<Municipality>(this);
}
