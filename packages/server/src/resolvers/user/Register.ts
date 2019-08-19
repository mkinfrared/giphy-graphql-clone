import { Query, Resolver } from "type-graphql";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Marklar";
  }
}
