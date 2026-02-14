// forwardMessage.js

import { getRoute } from "./routingTable";

export function forwardMessage(packet) {
  const route = getRoute(packet.destIP);

  if (!route) {
    console.error("No route found for", packet.destIP);
    return;
  }

  console.log(
    `Forwarding packet to ${packet.destIP} via next hop ${route.nextHop}`
  );

  // simulated send
  packet.ttl -= 1;

  if (packet.ttl <= 0) {
    console.error("Packet dropped (TTL expired)");
    return;
  }

  // sendToNextHop(route.nextHop, packet) → socket.js
}
