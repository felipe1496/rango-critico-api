"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_fastify = __toESM(require("fastify"), 1);

// src/modules/auth/handler.ts
var import_sql_js_builder = require("sql-js-builder");
function authHandler(fastify2) {
  fastify2.get("/", async (request, reply) => {
    const { sql, values } = (0, import_sql_js_builder.where)().and("id", "eq", "123").or([
      ["id", "like", "456"],
      ["name", "eq", "789"]
    ]).build();
    return { sql, values };
  });
}

// src/index.ts
var fastify = (0, import_fastify.default)();
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
