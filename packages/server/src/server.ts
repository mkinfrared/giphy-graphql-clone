import "reflect-metadata";

import resolvers from "@resolvers/index";
import { authChecker } from "@util/checkAuth";
import { redis } from "@util/redis";
import {
  CORS_ORIGIN,
  NODE_ENV,
  REDIS_HOST,
  SERVER_ADDRESS,
  SERVER_PORT,
  SESSION_SECRET
} from "@util/secrets";
import { ApolloServer } from "apollo-server-express";
import connectRedis = require("connect-redis");
import cors = require("cors");
import express from "express";
import session from "express-session";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

const main = async () => {
  try {
    await createConnection();
    console.log("Successfully connected to database");

    const schema = await buildSchema({
      resolvers,
      authChecker
    });
    const RedisStore = connectRedis(session);
    const app = express();

    app.use(
      cors({
        credentials: true,
        origin: CORS_ORIGIN
      })
    );

    app.use(
      session({
        store: new RedisStore({
          client: redis as any,
          host: REDIS_HOST,
          port: 6379,
          ttl: 86400
        }),
        name: "qid",
        secret: SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days expiration
        }
      })
    );

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req }) => ({ req })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(SERVER_PORT, () => {
      console.info(`Server is running on port ${SERVER_PORT}`);
      console.info(
        `Graphql docs are available at ${SERVER_ADDRESS}:${SERVER_PORT}/graphql`
      );
    });
  } catch (e) {
    console.log("Could not connect to database");
    console.error(e);
  }
};

main();
