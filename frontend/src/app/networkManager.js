// networkManager.js
import { bfs } from "./bfs";
import { dijkstra } from "./dijkstra";
import { clearRoutingTable, addRoute } from "./routingTable";
import { getMyIP } from "./deviceConfig";

function buildGraph(topology) {
  const graph = {};

  topology.forEach(({ from, to, cost }) => {
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];

    graph[from].push({ node: to, cost });
    graph[to].push({ node: from, cost });
  });

  return graph;
}

export function recomputeRoutes(topology, mode = "dijkstra") {
  const myIP = getMyIP();
  if (!myIP) return;

  const graph = buildGraph(topology);
  clearRoutingTable();

  if (mode === "bfs") {
    const parentMap = bfs(graph, myIP);

    for (const dest in parentMap) {
      let nextHop = dest;
      while (parentMap[nextHop] !== myIP) {
        nextHop = parentMap[nextHop];
      }
      addRoute(dest, nextHop, 1);
    }
  }

  if (mode === "dijkstra") {
    const { distances, prev } = dijkstra(graph, myIP);

    for (const dest in distances) {
      let nextHop = dest;
      while (prev[nextHop] && prev[nextHop] !== myIP) {
        nextHop = prev[nextHop];
      }
      addRoute(dest, nextHop, distances[dest]);
    }
  }
}
