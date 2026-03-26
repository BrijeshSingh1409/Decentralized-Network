export function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [[startNode, null]];
  const parentMap = {};

  visited.add(startNode);

  while (queue.length) {
    const [current, parent] = queue.shift();
    parentMap[current] = parent;

    for (const edge of graph[current] || []) {
      const neighbor = typeof edge === "string" ? edge : edge.node;

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, current]);
      }
    }
  }

  return parentMap;
}
