import { EdgeProps,NodeProps } from "@xyflow/react";
import { nanoid } from "nanoid/non-secure";

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
    children: []
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
  };
  const newEdge = {
    id: nanoid(),
    source: `${parentNode.id}`,
    target: `${node.id}`,
    
  };

  nodes = [...nodes, newNode];
  edges = [...edges, newEdge];
}

function traverseNodeChild(arrayOfNode: NodeProps[], parentNode: NodeProps) {
  if (arrayOfNode.length <= 0) {
    return;
  }
  arrayOfNode.forEach((node) => {
    addChildNode(node, parentNode);
    if (node.children.length > 0) {
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
    traverseNodeChild(nodeTree.children, nodeTree);
  }
  console.log("convertTreeToNodes", nodes, edges);
  return [nodes, edges];
}

export default convertTreeToNodes;

// export {nodes, edges}
