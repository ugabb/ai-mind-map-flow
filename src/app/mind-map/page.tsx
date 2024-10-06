"use client";

import {
  useState,
  useCallback, useLayoutEffect
} from "react";
import {
  ReactFlow, useNodesState,
  useEdgesState,
  addEdge,
  Background,
  ConnectionMode,
  Connection,
  MarkerType,
  ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Square } from "@/components/Squaree";
import { DefaultEdge } from "@/components/edges/DefaultEdges";
import convertJsonToTree from "@/utils/convertJsonToTree";
import convertTreeToNodes from "@/utils/convertTreeToNodes";

import ELK from "elkjs/lib/elk.bundled.js";
import { ActionsBar } from "@/components/Menubar";
import { useNodeStore } from "@/store/NodeStore";
import { ImSpinner8 } from "react-icons/im";
import { zinc } from "tailwindcss/colors";

const elk = new ELK();

//Elk options for layouting the tree
const elkOptions = {
  "elk.algorithm": "mrtree",
  "elk.layered.spacing.nodeNodeBetweenLayers": "200",
  "elk.spacing.nodeNode": "150",
  "elk.edgeRouting": "SPLINES",
  "elk.layered.nodePlacement.strategy": "SIMPLE",
  "elk.mrtree.edgeRoutingMode": "AVOID_OVERLAP",
  "elk.animate": true,
  "elk.direction": "DOWN",
};

/**
 *
 * @param {*} nodes array of nodes from store
 * @param {*} edges array of edges from store
 * @param {*} options options from elkOptions. Used for layouting tree
 * @returns promises that contains array of nodes or edges that already get layouted or repositioned
 */
const getLayoutedElements = (nodes: any[], edges: any[], options = {}) => {
  // @ts-ignore
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    //Passed array of nodes that contains target position and source position. The target position and source position change based on isHorizontal
    children: nodes.map((node) => ({
      ...node,
      targetPosition: "top",
      sourcePosition: "bottom",
      //Hardcode a width and height for node so that elk can use it when layouting.
      width: 200,
      height: 200,
    })),
    edges: edges,
  };

  //Return promises
  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes:
        layoutedGraph.children &&
        layoutedGraph.children.map((node) => {
          return {
            ...node,
            // React Flow expects a position property on the node instead of `x` and `y` fields.
            position: { x: node.x, y: node.y },
          };
        }),
      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

const nodeTypes = { square: Square };
const edgesTypes = { default: DefaultEdge };

const MindMapCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { isCreatingNode, mindMap, mindMapLoadingRequest } = useNodeStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  

  const handleMouseMove = useCallback(
    (event: any) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    },
    [setMousePosition]
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  /**
   * @param {*} direction an object contains direction. for elkjs to know which direction layouting to use for the tree
   * @param {*} initialNodes array of nodes and edges [nodes, edges] .Using this because variable "nodes" from state still empty for the first time
   */
  const onLayout = useCallback(
    (
      { direction }: { direction: any },
      initialNodes: any[][] | null = null
    ) => {
      console.log({ direction });

      const opts = { "elk.direction": direction, ...elkOptions };

      const ns = initialNodes === null ? nodes : initialNodes[0];
      const es = initialNodes === null ? edges : initialNodes[1];
      getLayoutedElements(ns, es, opts).then((layoutedGraph) => {
        if (layoutedGraph) {
          const { nodes: layoutedNodes, edges: layoutedEdges } = layoutedGraph;
          //add layouted or repositioned nodes and edges to store, so that react flow will render the layouted or repositioned nodes and edges
          // @ts-ignore
          setNodes(layoutedNodes);
          // @ts-ignore
          setEdges(layoutedEdges);
          console.log("Final Node Positions: ", layoutedNodes);
          console.log("Final Edge Connections: ", layoutedEdges);
        }
      });
    },
    [nodes, edges, setNodes, setEdges] //So that the useCallback will rememoize the nodes and edges variable if it values changed.
  );

  useLayoutEffect(() => {
    const nodeTree = convertJsonToTree(mindMap); //to convert json to tree
    let convertedNodes = convertTreeToNodes(nodeTree, true); //to convert tree to nodes
    onLayout({ direction: "DOWN" }, convertedNodes);
  }, [mindMap]);

  // useEffect(() => {
  //   console.log("nodes", nodes);
  // }, [nodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgesTypes}
      defaultEdgeOptions={{
        type: "default",
        markerEnd: {
          type: MarkerType.Arrow,
          width: 25,
          height: 25,
          color: zinc[400],
        },
      }}
      onInit={setRfInstance}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionMode={ConnectionMode.Loose}
      // onInit={setRfInstance}
      fitView
      fitViewOptions={{ padding: 2 }}
      className="h-screen w-screen"
      onMouseMove={handleMouseMove}
    >
      {isCreatingNode && (
        <div
          className="bg-indigo-400/20 rounded  min-w-[200px] min-h-[200px]"
          style={{
            position: "absolute",
            left: mousePosition?.x - 8,
            top: mousePosition?.y - 8,
            pointerEvents: "none", // Allow clicks to pass through
            zIndex: 1, // Ensure it's above the background
          }}
        />
      )}
      <Background />
      <ActionsBar rfInstance={rfInstance} />

      {mindMapLoadingRequest && (
        <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black/20">
          <ImSpinner8 className="w-10 h-10 text-indigo-500 animate-spin z-50" />
        </div>
      )}
    </ReactFlow>
  );
};

export default MindMapCanvas;
