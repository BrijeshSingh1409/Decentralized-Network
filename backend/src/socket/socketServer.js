// socket/socketServer.js

import axios from "axios";

let ipCounter = 1;
const socketToIP = {};
const ipToSocket = {};

// Generate a unique IP
function generateIP() {
  const ip = `10.0.0.${ipCounter}`;
  ipCounter++;
  return ip;
}

export const setupSocketServer = (io) => {
  io.on("connection", (socket) => {

    console.log("Device connected:", socket.id);

    // Device requests IP
    socket.on("REQUEST_IP", async () => {

      const ip = generateIP();

      socketToIP[socket.id] = ip;
      ipToSocket[ip] = socket.id;

      // Send assigned IP back to device
      socket.emit("ASSIGN_IP", ip);
      console.log("Assigned IP:", ip);

      // Register node in MongoDB via backend API
      try {
        await axios.post("http://localhost:5000/api/nodes/register", {
          nodeId: socket.id,
          ip,
        });
        console.log(`Node ${socket.id} registered in MongoDB`);
      } catch (err) {
        console.error("Failed to register node in DB:", err.message);
      }

      // Send TOPOLOGY_UPDATE to all devices
      const topology = Object.keys(ipToSocket).map(ipAddr => ({
        from: ipAddr,
        to: ipAddr,
        cost: 1
      }));
      io.emit("TOPOLOGY_UPDATE", topology);

    });

    // Packet forwarding (unified event name with frontend)
    socket.on("packet-send", ({ nextHopIP, packet }) => {
      const nextSocket = ipToSocket[nextHopIP];

      if (nextSocket) {
        io.to(nextSocket).emit("packet-receive", packet);
      } else {
        console.error("Next hop not found for IP:", nextHopIP);
      }
    });

    // Handle disconnect
    socket.on("disconnect", async () => {

      const ip = socketToIP[socket.id];

      delete socketToIP[socket.id];
      delete ipToSocket[ip];

      console.log("Device disconnected:", ip);

      // Remove from MongoDB
      try {
        await axios.post("http://localhost:5000/api/nodes/remove", {
          nodeId: socket.id
        });
      } catch (err) {
        console.error("Failed to remove node from DB:", err.message);
      }

      // Update topology for remaining devices
      const topology = Object.keys(ipToSocket).map(ipAddr => ({
        from: ipAddr,
        to: ipAddr,
        cost: 1
      }));
      io.emit("TOPOLOGY_UPDATE", topology);
    });

  });
};