import gifResolvers from "@resolvers/gif";
import userResolvers from "@resolvers/user";

const resolvers = [...userResolvers, ...gifResolvers];

export default resolvers;
