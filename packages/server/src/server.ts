import { NODE_ENV } from "@util/secrets";
import "reflect-metadata";
import { createConnection } from "typeorm";

import app from "./app";

(async () => {
  try {
    await createConnection(NODE_ENV!);
    console.log("Successfully connected to database");

    app.listen(4747, () => {
      console.log(`Server is running on port ${4747}`);
    });
  } catch (e) {
    console.log("Could not connect to database");
    console.error(e);
  }
})();
