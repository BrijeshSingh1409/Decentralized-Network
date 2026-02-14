// src/app/routingTable.js

// In-memory routing table
// destinationIP -> { nextHopIP, cost }
const routingTable = {};

/**
 * Add or update a route
 * @param {string} destinationIP
 * @param {string} nextHopIP
 * @param {number} cost
 */
export function addRoute(destinationIP, nextHopIP, cost) {
  // If route doesn't exist OR new cost is better → update
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

/**
 * Remove a route (used when node goes offline)
 */
export function removeRoute(destinationIP) {
  delete routingTable[destinationIP];
}

/**
 * Get route for forwarding
 */
export function getRoute(destinationIP) {
  return routingTable[destinationIP] || null;
}

/**
 * Get full routing table (for debugging / UI)
 */
export function getRoutingTable() {
  return { ...routingTable };
}

/**
 * Clear routing table (used before recomputation)
 */
export function clearRoutingTable() {
  Object.keys(routingTable).forEach((key) => delete routingTable[key]);
}
