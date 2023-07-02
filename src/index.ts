import Fastify from "fastify";
import cors from "@fastify/cors";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

import userRoutes from "./routes/user";

const fastify = Fastify();

const PORT = (process.env.PORT || 5000) as number;

// health check
fastify.get("/ping", async () => "pong\n");
fastify.register(cors, { origin: "*" });
fastify.register(userRoutes, { prefix: "/users" });

const mongodbUrl: string = process.env.MONGODB_URL ?? '';
const start = async () => {
  try {
    await mongoose.connect(
      mongodbUrl
    );
    console.log("MongoDB Connected...");
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    console.error(err);
    process.exit(1);
  }
};

start();
