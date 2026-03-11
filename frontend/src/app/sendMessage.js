import { getMyIP } from "./deviceConfig";
import { forwardMessage } from "./forwardMessage";

export function sendMessage(destIP, message) {

  const sourceIP = getMyIP();

  if (!sourceIP) {
    console.error("Device IP not assigned yet");
    return;
  }

  const packet = {
    sourceIP: sourceIP,
    destIP: destIP,
    payload: message,
    ttl: 10,
    createdAt: Date.now()
  };

  console.log("Sending packet:", packet);

  forwardMessage(packet);
}