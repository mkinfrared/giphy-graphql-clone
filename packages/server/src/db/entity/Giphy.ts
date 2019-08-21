import { Favorite } from "@db/entity/Favorite";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class Giphy extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  rating: string;

  @OneToMany(type => Favorite, favorite => favorite.giphy)
  favoriteConnection: Promise<Favorite[]>;
}
