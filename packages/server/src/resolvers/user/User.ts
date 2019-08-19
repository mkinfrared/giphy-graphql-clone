import { User } from "@db/entity/User";
import { RegisterValidation } from "@resolvers/user/RegisterValidation";
import bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg("username") username: string): Promise<User | undefined> {
    const user = await User.findOne({ where: { username } });

    return user;
  }

  @Mutation(() => User)
  async register(@Arg("data")
  {
    username,
    password
  }: RegisterValidation): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.create({
      username,
      password: hashedPassword
    });

    await user.save();

    return user;
  }
}
