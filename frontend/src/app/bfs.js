// bfs.js

export function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [[startNode, null]]; // [current, parent]
  const parentMap = {};

  visited.add(startNode);

  while (queue.length) {
    const [current, parent] = queue.shift();
    parentMap[current] = parent;

    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, current]);
      }
    }
  }

  return parentMap;
}
