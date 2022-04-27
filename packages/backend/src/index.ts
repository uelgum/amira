import http from "http";
import express from "express";
import cors from "cors";
import { Server as SocketIO } from "socket.io";
import config from "@config";

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.use(cors());
app.use(express.json());

server.listen(config.port, () => {
    console.log(`Online (Port ${config.port})`);
});