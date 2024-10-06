// @ts-nocheck
import { Edge, NodeProps, Position } from "@xyflow/react";

function generateEdgeId(sourceId: string, targetId: string) {
  return `edge-${sourceId}-${targetId}`;
}


let nodes: NodeProps[] = [];
let edges: any[] = [];

function addRootNode(node: NodeProps) {
  const newNode: NodeProps = {
    id: node.id,
    data: { label: node.value },
    positionAbsoluteX:  0,
    positionAbsoluteY: 0,
    dragging: false,
    isConnectable: true,
    type: "square",
    zIndex: 0,
    children: [],
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,

  };

  nodes = [...nodes, newNode];
}

function addChildNode(node: NodeProps, parentNode: NodeProps) {
  const newNode: NodeProps = {
    id: node.id,
    data: {
      label:
        typeof node.value === "string" || typeof node.value === "number"
          ? node.value
          : node.value,
    },
    positionAbsoluteX:  0,
    positionAbsoluteY: 0,
    dragging: false,
    isConnectable: true,
    type: "square",
    zIndex: 0,
    parent: parentNode.id,
    children: [],
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  };
  const newEdge: Edge = {
    id: generateEdgeId(parentNode.id,node.id),
    source: `${parentNode.id}`,
    target: `${node.id}`,
  };

  nodes = [...nodes, newNode];
  edges = [...edges, newEdge];
  // console.log("[TESTE]",newEdge,newNode)
}

function traverseNodeChild(arrayOfNode: NodeProps[], parentNode: NodeProps) {
  if (arrayOfNode.length <= 0) {
    return;
  }
  arrayOfNode.forEach((node) => {
    addChildNode(node, parentNode);
    if (node.children && node.children.length > 0) {
      traverseNodeChild(node.children, node);
    }
  });
}

function convertTreeToNodes(nodeTree: NodeProps, isRoot = false) {
  if (isRoot === true) {
    nodes = [];
    edges = [];
    addRootNode(nodeTree);
    convertTreeToNodes(nodeTree);
} else {
  // @ts-ignore
    traverseNodeChild(nodeTree.children , nodeTree);
  }
  // console.log("[VMO ver]",nodes,edges)
  return [nodes, edges];
}

export default convertTreeToNodes;

// export {nodes, edges}
