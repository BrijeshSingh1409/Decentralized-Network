import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import { connectDB } from "./config/db.js";
import nodeRoutes from "./routes/node.routes.js";
import { setupSocketServer } from "./socket/socketServer.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/nodes", nodeRoutes);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

setupSocketServer(io);

// DB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
