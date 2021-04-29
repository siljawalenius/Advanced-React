import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema"; //this will chanege- just look @ the package json dependencies
import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";
import { createAuth } from "@keystone-next/auth";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import { insertSeedData } from "./seed-data";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, //how long should they stay signed in
  secret: process.env.COOKIE_SECRET,
};

//adding auth
const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    //TODO: add in initisal roles
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL], //connects backend to frontend
        credentials: true, //passes along the cookie
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      async onConnect(keystone) {
        console.log("Connected to database!");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      //SCHEMA ITEMS GO IN HERE
      User,
      Product,
      ProductImage,
    }),
    ui: {
      //TODO: change this for roles
      //show UI only for peple who pass the authentication test
      isAccessAllowed: ({ session }) => {
        console.log(session);
        return session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      //graphQL query
      User: `id`,
    }),
  })
);
