"use client";

import { useState, useCallback, useLayoutEffect, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  ConnectionMode,
  Connection,
  MarkerType,
  ReactFlowInstance,
  Edge,
  Node,
  Panel,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Square } from "@/components/Custom Nodes/Square/Squaree";
import { DefaultEdge } from "@/components/edges/DefaultEdges";
import convertJsonToTree from "@/utils/convertJsonToTree";
import convertTreeToNodes from "@/utils/convertTreeToNodes";

import ELK from "elkjs/lib/elk.bundled.js";
import { Menubar } from "@/components/Menubar";
import { useNodeStore } from "@/store/NodeStore";
import { ImSpinner8 } from "react-icons/im";
import { zinc } from "tailwindcss/colors";
import { PiArrowLeft } from "react-icons/pi";
import Link from "next/link";
import toast from "react-hot-toast";

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
      width: 300,
      height: 300,
    })),
    edges: edges,
  };

  //Return promises
  return elk
    .layout(graph)
    .then((layoutedGraph) => {
      return {
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
      };
    })
    .catch((error) => {
      console.error("Error layouting the graph", error);
      return null;
    });
};

const nodeTypes = { square: Square };
const edgesTypes = { default: DefaultEdge };

const MindMapCanvas = () => {
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);
  const {
    isCreatingNode,
    mindMapToGenerate,
    mindMapLoadingRequest,
    currentMindMap,
  } = useNodeStore();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );
  const handleMouseMove = useCallback(
    (event: any) => {
      if (!isCreatingNode) return;
      setMousePosition({ x: event.clientX, y: event.clientY });
    },
    [isCreatingNode]
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
      const opts = { ...elkOptions, "elk.direction": direction };
      const ns = initialNodes === null ? nodes : initialNodes[0];
      const es = initialNodes === null ? edges : initialNodes[1];
      getLayoutedElements(ns, es, opts).then((layoutedGraph) => {
        if (layoutedGraph) {
          const { nodes: layoutedNodes, edges: layoutedEdges } = layoutedGraph;
          // @ts-ignore
          setNodes(layoutedNodes);
          // @ts-ignore
          setEdges(layoutedEdges);
        } else {
          toast.error("Error layouting the graph");
        }
      });
    },
    [nodes, edges]
  );

  useLayoutEffect(() => {
    if (!mindMapToGenerate) return;
    const nodeTree = convertJsonToTree(mindMapToGenerate); //to convert json to tree
    let convertedNodes = convertTreeToNodes(nodeTree, true); //to convert tree to nodes
    onLayout({ direction: "DOWN" }, convertedNodes);
  }, [mindMapToGenerate]);

  useEffect(() => {
    if (rfInstance) {
      rfInstance.fitView();
    }
  }, [rfInstance]);


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

      <Panel
        position="top-left"
        className="flex gap-3 items-center bg-indigo-50 p-3 rounded-lg"
      >
        <Link href="/home">
          <PiArrowLeft className="size-5 text-zinc-900" />
        </Link>
        <h1 className="text-xl font-medium">
          {currentMindMap?.title ? currentMindMap?.title : "Untitled"}
        </h1>
      </Panel>

      <Background />
      <MiniMap />
      <Menubar rfInstance={rfInstance} />

      {mindMapLoadingRequest && (
        <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black/20">
          <ImSpinner8 className="w-10 h-10 text-indigo-500 animate-spin z-50" />
        </div>
      )}
    </ReactFlow>
  );
};

export default MindMapCanvas;
