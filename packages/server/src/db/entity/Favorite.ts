import { Category } from "@db/entity/Category";
import { Giphy } from "@db/entity/Giphy";
import { User } from "@db/entity/User";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from "typeorm";

@ObjectType()
@Entity()
export class Favorite extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userID: string;

  @Field()
  @PrimaryColumn()
  giphyID: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  categoryID: number;

  @ManyToOne(type => User, user => user.favoriteConnection, { primary: true })
  @JoinColumn({ name: "userID" })
  user: Promise<User>;

  @ManyToOne(type => Giphy, giphy => giphy.favoriteConnection, {
    primary: true
  })
  @JoinColumn({ name: "giphyID" })
  giphy: Promise<Giphy[]>;

  @ManyToOne(type => Category, category => category.favoriteConnection, {
    primary: true,
    nullable: true
  })
  @JoinColumn({ name: "categoryID" })
  category: Promise<Category[]>;
}
