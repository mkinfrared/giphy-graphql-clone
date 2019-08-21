import { RequestContext } from "@type/RequestContext.type";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<RequestContext> = (
  { root, args, context, info },
  roles
) => {
  return !!context.req.session!.userID;
};
