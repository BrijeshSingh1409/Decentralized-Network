// deviceConfig.js
import socket from "./socket";

let myIP = null;
let neighbors = [];

// Request dynamic IP from backend
export function requestIP() {
  socket.emit("REQUEST_IP");

  socket.on("ASSIGN_IP", (ip) => {
    myIP = ip;
    console.log("Assigned IP:", myIP);
  });
}

// Update neighbors when topology changes
export function updateNeighbors(newNeighbors) {
  neighbors = newNeighbors;
}

// Getters
export function getMyIP() {
  return myIP;
}

export function getNeighbors() {
  return neighbors;
}
