import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { Base } from "./Base";

@ObjectType({
    description: "countries data are fetched from kaggle.com and every country contains its province ids and "
})
@Entity()
export class Country extends Base {
    // priority? // ask Syd
    @Field({
        description: "name of "
    })
    @Column("varchar", { length: 50 })
    name: string;

    @Field({
        nullable: true,
        description: "usually are 3 letter of country name as a sample data"
    })
    @Column("varchar", { length: 10 })
    abb?: string;

    @Field({
        nullable: true,
        description: "a random number in a reasonable range"
    })
    @Column("number", { nullable: true, length: 1000 })
    population?: number;

    @Field({
        nullable: true,
        description: "provinces of the country."
    })
    @OneToMany(() => User, { nullable: true })
    @JoinColumn({ name: "provinces" })
    provinces?: Province;
}
