import { type Edge, MarkerType, type Node, Position } from "@xyflow/react";

// Counter to generate unique node IDs
let nodeCounter = 0;

// Function to generate a unique node ID
function generateNodeId(): string {
  nodeCounter += 1;
  return `n${nodeCounter}`;
}

// Function to generate edge ID
function generateEdgeId(sourceId: string, targetId: string): string {
  return `xy-edge__${sourceId}bottom-${targetId}top`;
}

// Reset counter for new conversions
function resetNodeCounter(): void {
  nodeCounter = 0;
}

/**
 * Converts hierarchical JSON directly to React Flow nodes and edges format
 * @param jsonData - The hierarchical JSON data
 * @returns [nodes, edges] array ready for React Flow
 */
export function convertJsonToReactFlow(jsonData: any): [Node[], Edge[]] {
  resetNodeCounter();

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  /**
   * Recursively processes JSON data to create nodes and edges
   * @param data - Current level of JSON data
   * @param parentId - ID of parent node (null for root)
   * @param key - The key name for this node
   */
  function processNode(
    data: any,
    parentId: string | null = null,
    key = ""
  ): string {
    const nodeId = generateNodeId();

    // Create the node
    const node: Node = {
      id: nodeId,
      data: { label: `<p>${key || "Root"}</p>` },
      position: { x: 0, y: 0 },
      type: "square",
      connectable: true,
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: {
        width: 300,
        height: 300,
        minWidth: 200,
        minHeight: 200,
      },
    };

    nodes.push(node);

    // If parent exists, create edge
    if (parentId) {
      const edge: Edge = {
        id: generateEdgeId(parentId, nodeId),
        source: parentId,
        sourceHandle: "bottom",
        target: nodeId,
        targetHandle: "top",
        type: "default",
        markerEnd: {
          type: MarkerType.Arrow,
          width: 25,
          height: 25,
          color: "#a1a1aa",
        },
      };
      edges.push(edge);
    }

    // Process children based on data type
    if (typeof data === "string") {
      // Create a child node for the string content
      const contentNodeId = generateNodeId();
      const contentNode: Node = {
        id: contentNodeId,
        data: { label: `<p>${data}</p>` },
        position: { x: 0, y: 0 },
        type: "square",
        connectable: true,
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        style: {
          width: 300,
          height: 300,
          minWidth: 200,
          minHeight: 200,
        },
      };

      nodes.push(contentNode);

      // Create edge from key node to content node
      const contentEdge: Edge = {
        id: generateEdgeId(nodeId, contentNodeId),
        source: nodeId,
        sourceHandle: "bottom",
        target: contentNodeId,
        targetHandle: "top",
        type: "default",
        markerEnd: {
          type: MarkerType.Arrow,
          width: 25,
          height: 25,
          color: "#a1a1aa",
        },
      };
      edges.push(contentEdge);
    } else if (
      typeof data === "object" &&
      data !== null &&
      !Array.isArray(data)
    ) {
      // Process object children
      Object.entries(data).forEach(([childKey, childValue]) => {
        processNode(childValue, nodeId, childKey);
      });
    }

    return nodeId;
  }

  // Start processing from the root
  if (typeof jsonData === "object" && jsonData !== null) {
    const rootKey = Object.keys(jsonData)[0];
    const rootValue = jsonData[rootKey];
    processNode(rootValue, null, rootKey);
  }

  return [nodes, edges];
}

export default convertJsonToReactFlow;
