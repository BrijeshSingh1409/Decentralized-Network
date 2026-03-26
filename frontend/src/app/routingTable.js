const routingTable = {};

// add or update route
export function addRoute(destinationIP, nextHopIP, cost) {
  if (!destinationIP || !nextHopIP) return;

  if (
    !routingTable[destinationIP] ||
    routingTable[destinationIP].cost > cost
  ) {
    routingTable[destinationIP] = {
      nextHopIP,
      cost,
      updatedAt: Date.now(),
    };
  }
}

// remove route
export function removeRoute(destinationIP) {
  delete routingTable[destinationIP];
}

// get best route
export function getRoute(destinationIP) {
  return routingTable[destinationIP] || null;
}

// get whole table
export function getRoutingTable() {
  return { ...routingTable };
}

// clear table
export function clearRoutingTable() {
  Object.keys(routingTable).forEach((key) => delete routingTable[key]);
}
