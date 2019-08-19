import { User } from "@db/entity/User";
import { RegisterValidation } from "@resolvers/user/RegisterValidation";
import { RequestContext } from "@type/RequestContext.type";
import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Ctx() context: RequestContext): Promise<User | undefined> {
    const user = await User.findOne(context.req.session!.userID);
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

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() context: RequestContext
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return undefined;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return undefined;
    }

    context.req.session!.userID = user.id;

    return user;
  }
}
