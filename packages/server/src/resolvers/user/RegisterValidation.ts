import { Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterValidation {
  @Field()
  @Length(5, 12)
  username: string;

  @Field()
  @MinLength(6)
  password: string;
}
