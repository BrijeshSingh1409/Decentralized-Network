import { io } from "socket.io-client";
import { recomputeRoutes } from "./networkManager";
import { forwardMessage } from "./forwardMessage";

const socket = io("http://localhost:5000");

export default socket;

export function sendPacket(nextHopIP, packet) {
  socket.emit("packet-send", {
    nextHopIP,
    packet,
  });
}

socket.on("packet-receive", (data) => {
  console.log("Packet received:", data);
  forwardMessage(data);
});

socket.on("TOPOLOGY_UPDATE", (topology) => {
  console.log("Topology received:", topology);
  recomputeRoutes(topology, "dijkstra");
});
