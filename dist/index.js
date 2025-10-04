// src/index.ts
import Fastify from "fastify";

// src/modules/auth/handler.ts
import { where } from "sql-js-builder";
function authHandler(fastify2) {
  fastify2.get("/", async (request, reply) => {
    const { sql, values } = where().and("id", "eq", "123").or([
      ["id", "like", "456"],
      ["name", "eq", "789"]
    ]).build();
    return { sql, values };
  });
}

// src/index.ts
var fastify = Fastify();
fastify.register(authHandler, { prefix: "/api/v1/auth" });
var start = async () => {
  try {
    await fastify.listen({ port: 3e3 });
    console.log(`Server listening on port :3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
