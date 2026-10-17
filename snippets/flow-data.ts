import { Position } from "@xyflow/react";
import type { Connection, Edge, Node } from "@xyflow/react";

export function workflowNodes(): Node[] {
  return [
    makeNode("request", "New request", 30, 80),
    makeNode("validate", "Validate", 260, 80),
    makeNode("review", "Review", 490, 30),
    makeNode("publish", "Publish", 490, 180),
    makeNode("notify", "Notify", 260, 300),
  ];
}

export function makeNode(id: string, label: string, x: number, y: number): Node {
  return {
    id,
    data: { label },
    position: { x, y },
    width: 160,
    height: 58,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    handles: [
      { type: "target", position: Position.Left, x: 0, y: 29 },
      { type: "source", position: Position.Right, x: 160, y: 29 },
    ],
  };
}

export function workflowEdges(): Edge[] {
  return [
    { id: "request-validate", source: "request", target: "validate" },
    { id: "validate-review", source: "validate", target: "review", label: "needs review" },
    { id: "validate-publish", source: "validate", target: "publish", label: "approved" },
    { id: "publish-notify", source: "publish", target: "notify" },
  ];
}

export function connectionError(
  connection: Pick<Connection, "source" | "target">,
  edges: Edge[],
): string | null {
  if (connection.source === connection.target) return "A step cannot connect to itself.";
  if (edges.some((edge) => edge.source === connection.source && edge.target === connection.target))
    return "Those steps are already connected.";
  const pending = [connection.target];
  const visited = new Set<string>();
  while (pending.length) {
    const current = pending.pop();
    if (!current || visited.has(current)) continue;
    if (current === connection.source) return "That connection would create a cycle.";
    visited.add(current);
    for (const edge of edges) if (edge.source === current) pending.push(edge.target);
  }
  return null;
}
