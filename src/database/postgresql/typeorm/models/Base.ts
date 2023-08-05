import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn
} from "typeorm";

@ObjectType({
    description: "Every object that has id, creation date and update date field is considered as thing."
})
export abstract class Base extends BaseEntity {
    @Field({ description: "The id is a unique auto generated number in `uuid` format." })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field({ description: "The date of the object creation." })
    @Index()
    @CreateDateColumn()
    createdAt: Date;

    @Field({ description: "The date of last object update." })
    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn()
    version: number;

    @Column("tsvector", { select: false, nullable: true })
    document?: any;
}
