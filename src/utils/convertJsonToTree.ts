// @ts-nocheck
import { NodeProps, Position } from '@xyflow/react';

// Counter to generate unique node IDs
let nodeCounter = 0;

// Function to generate a unique node ID
function generateNodeId() {
  nodeCounter += 1;
  return `n${nodeCounter}`;
}

// Recursive function to convert JSON data to a tree structure
const jsonToTree = (data: any, newNode: NodeProps, isRoot = false) => {
  // Create a new node with default properties
  const node: NodeProps = {
    id: generateNodeId(),
    key: "",
    value: {},
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    data: { label: "" },
    dragging: false,
    isConnectable: true,
    type: "square",
    zIndex: 0,
    parentId: newNode.id,
    children: [],
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  };

  // Iterate over each key-value pair in the data
  Object.entries(data).forEach(([key, value]) => {
    // If the value is not an object or array, handle it as a leaf node
    if (typeof value !== "object" && !Array.isArray(value)) {
      if (isRoot) {
        newNode.key = key;
        newNode.value[key] = value;
      } else {
        node.key = newNode.key + '-children';
        node.value[key] = value;
      }
    } else if (Array.isArray(value)) {
      // If the value is an array, handle it accordingly
      const valObjectFind = value.find((val) => typeof val === "object");

      if (valObjectFind) {
        // If the array contains objects, create child nodes for each object
        const childNode: NodeProps = {
          id: generateNodeId(),
          key: key,
          value: key,
          positionAbsoluteX: 0,
          positionAbsoluteY: 0,
          data: { label: "" },
          dragging: false,
          isConnectable: true,
          type: "square",
          zIndex: 0,
          parentId: isRoot ? newNode.id : node.id,
          children: [],
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        };
        value.forEach((valueFromArray) => {
          if (typeof valueFromArray === 'object') {
            jsonToTree(valueFromArray, childNode);
          } else {
            const childNodeForPropertyWithValueArray: NodeProps = {
              id: generateNodeId(),
              key: childNode.key + '-children',
              value: {},
              positionAbsoluteX: 0,
              positionAbsoluteY: 0,
              data: { label: "" },
              dragging: false,
              isConnectable: true,
              type: "square",
              zIndex: 0,
              parentId: childNode.id,
              children: [],
              sourcePosition: Position.Bottom,
              targetPosition: Position.Top,
            };
            childNodeForPropertyWithValueArray.value = valueFromArray;
            if (childNode.children) childNode.children.push(childNodeForPropertyWithValueArray);
          }
        });
        if (isRoot) {
          if (!newNode.children) {
            newNode.children = [];
          }
          newNode.children.push(childNode);
        } else {
          if (!node.children) {
            node.children = [];
          }
          node.children.push(childNode);
        }
      } else {
        // If the array does not contain objects, create a single child node
        const childNodeAddition: NodeProps = {
          id: generateNodeId(),
          key: "",
          value: {},
          positionAbsoluteX: 0,
          positionAbsoluteY: 0,
          data: { label: "" },
          dragging: false,
          isConnectable: true,
          type: "square",
          zIndex: 0,
          parentId: node.id,
          children: [],
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        };
        childNodeAddition.key = key;
        childNodeAddition.value = key;
        for (let i = 0; i < value.length; i++) {
          const childChildNode: NodeProps = {
            id: generateNodeId(),
            key: key + "-child",
            value: {},
            positionAbsoluteX: 0,
            positionAbsoluteY: 0,
            data: { label: "" },
            dragging: false,
            isConnectable: true,
            type: "square",
            zIndex: 0,
            parentId: childNodeAddition.id,
            children: [],
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
          };
          childChildNode.value = value[i];
          if (childNodeAddition.children) childNodeAddition.children.push(childChildNode);
        }
        if (node.children) node.children.push(childNodeAddition);
      }
    } else {
      // If the value is an object, recursively convert it to a tree
      const childNode: NodeProps = {
        id: generateNodeId(),
        key: key,
        value: key,
        positionAbsoluteX: 0,
        positionAbsoluteY: 0,
        data: { label: "" },
        dragging: false,
        isConnectable: true,
        type: "square",
        zIndex: 0,
        parentId: isRoot ? newNode.id : node.id,
        children: [],
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
      jsonToTree(value, childNode);
      if (isRoot) {
        if (newNode.children) newNode.children.push(childNode);
      } else {
        if (node.children) node.children.push(childNode);
      }
    }
  });

  // Add the node to the parent's children if it's not the root
  if (!isRoot) {
    if (newNode.children) newNode.children.push(node);
  } else {
    newNode.key = 'root';
  }
  return newNode;
}

// Function to convert JSON data to a tree structure with a root node
function convertJsonToTree(json: any) {
  const rootNode: NodeProps = {
    id: generateNodeId(),
    key: "root",
    type: "square",
    dragging: false,
    zIndex: 0,
    isConnectable: true,
    data: { label: "root" },
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
    parentId: "root",
    value: {},
    children: [],
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  };

  // Convert the JSON data to a tree starting from the root node
  jsonToTree(json, rootNode, true);
  return rootNode;
}

export default convertJsonToTree;
