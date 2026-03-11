import { getRoute } from "./routingTable";
import { getMyIP } from "./deviceConfig";
import { sendPacket } from "./socket";

export function forwardMessage(packet) {

  const myIP = getMyIP();

  if (packet.destIP === myIP) {

    window.dispatchEvent(
      new CustomEvent("MESSAGE_RECEIVED", { detail: packet })
    );

    return;
  }

  const route = getRoute(packet.destIP);

  if (!route) {
    console.error("No route found for", packet.destIP);
    return;
  }

  packet.ttl -= 1;

  if (packet.ttl <= 0) {
    console.error("Packet dropped (TTL expired)");
    return;
  }

  sendPacket(route.nextHopIP, packet);
}