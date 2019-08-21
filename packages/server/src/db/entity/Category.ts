import { Favorite } from "@db/entity/Favorite";
import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Category {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column("varchar", { unique: true })
  name: string;

  @OneToMany(type => Favorite, favorite => favorite.category)
  favoriteConnection: Promise<Favorite[]>;
}
