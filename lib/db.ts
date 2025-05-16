import { Client, vector } from "@libsql/client";

if (!process.env.LIBSQL_URL) {
  throw new Error("Missing environment variable LIBSQL_URL");
}

export const sqlClient = new Client({
  url: process.env.LIBSQL_URL,
  auth: { token: process.env.LIBSQL_AUTH_TOKEN },
});
export const vectorClient = vector(sqlClient);
