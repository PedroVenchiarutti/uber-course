import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "../routes";

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // Defina a origem permitida correta
  })
);

server.use(
  morgan(":method :status :url :response-time ms - :res[content-length]")
);

server.use("/api", router);

export default server;
