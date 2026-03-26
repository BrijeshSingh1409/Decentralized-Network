export function dijkstra(graph, start) {
  const distances = {};
  const prev = {};
  const visited = new Set();

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity;
  });

  distances[start] = 0;

  while (true) {
    let closestNode = null;
    let minDist = Infinity;

    for (const node in distances) {
      if (!visited.has(node) && distances[node] < minDist) {
        minDist = distances[node];
        closestNode = node;
      }
    }

    if (!closestNode) break;

    visited.add(closestNode);

    for (const { node, cost } of graph[closestNode] || []) {
      const newDist = distances[closestNode] + cost;
      if (newDist < distances[node]) {
        distances[node] = newDist;
        prev[node] = closestNode;
      }
    }
  }

  return { distances, prev };
}
