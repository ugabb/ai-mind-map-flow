"use client";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  type Connection,
  ConnectionMode,
  type Edge,
  type EdgeChange,
  MarkerType,
  MiniMap,
  type Node,
  type NodeChange,
  Panel,
  ReactFlow,
  type ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import "@xyflow/react/dist/style.css";

import ELK from "elkjs/lib/elk.bundled.js";
import Link from "next/link";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";
import { PiArrowLeft } from "react-icons/pi";
import { zinc } from "tailwindcss/colors";
import { Square } from "@/components/Custom Nodes/Square/Squaree";
import DialogCustomMindMap from "@/components/DialogCustomMindMap";
import { DefaultEdge } from "@/components/edges/DefaultEdges";
import { Menubar } from "@/components/Menubar";
import { useNodeStore } from "@/store/NodeStore";
import convertJsonToReactFlow from "@/utils/convertJsonToReactFlow";

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
  // @ts-expect-error
  const _isHorizontal = options?.["elk.direction"] === "RIGHT";
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
    edges,
  };

  //Return promises
  return elk
    .layout(graph)
    .then((layoutedGraph) => {
      return {
        nodes: layoutedGraph.children?.map((node) => {
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
      console.log("onNodesChange", rfInstance?.toObject());
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes, rfInstance?.toObject]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );
  const handleMouseMove = useCallback(
    (event: any) => {
      if (!isCreatingNode) {
        return;
      }
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
          // @ts-expect-error
          setNodes(layoutedNodes);
          // @ts-expect-error
          setEdges(layoutedEdges);
        } else {
          toast.error("Error layouting the graph");
        }
      });
    },
    [
      nodes,
      edges, // @ts-expect-error
      setEdges, // @ts-expect-error
      setNodes,
    ]
  );

  useLayoutEffect(() => {
    if (!mindMapToGenerate) {
      return;
    }
    console.log("mindMapToGenerate", mindMapToGenerate);

    // Parse the JSON string if it's a string
    let jsonData = mindMapToGenerate;
    if (typeof mindMapToGenerate === "string") {
      try {
        jsonData = JSON.parse(mindMapToGenerate);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
      }
    }

    // Convert JSON directly to React Flow format
    const [convertedNodes, convertedEdges] = convertJsonToReactFlow(jsonData);
    onLayout({ direction: "DOWN" }, [convertedNodes, convertedEdges]);
  }, [mindMapToGenerate, onLayout]);

  useEffect(() => {
    if (rfInstance) {
      rfInstance.fitView();
    }
  }, [rfInstance]);

  return (
    <ReactFlow
      className="h-screen w-screen"
      connectionMode={ConnectionMode.Loose}
      defaultEdgeOptions={{
        type: "default",
        markerEnd: {
          type: MarkerType.Arrow,
          width: 25,
          height: 25,
          color: zinc[400],
        },
      }}
      edges={edges}
      edgeTypes={edgesTypes}
      fitView
      fitViewOptions={{ padding: 2 }}
      nodes={nodes}
      nodeTypes={nodeTypes}
      onConnect={onConnect}
      onEdgesChange={onEdgesChange}
      onInit={setRfInstance}
      onMouseMove={handleMouseMove}
      onNodesChange={onNodesChange}
      panOnDrag={false}
      panOnScroll
      selectionOnDrag
    >
      {isCreatingNode && (
        <div
          className="min-h-[200px] min-w-[200px] rounded bg-primary/20"
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
        className="flex items-center gap-3 rounded-lg bg-primary/10 p-3"
        position="top-left"
      >
        <Link href="/home">
          <PiArrowLeft className="size-5 text-foreground" />
        </Link>
        <h1 className="font-medium text-xl">
          {currentMindMap?.title ? currentMindMap?.title : "Untitled"}
        </h1>
      </Panel>

      <Panel className="rounded-lg bg-primary/10 p-3" position="top-right">
        <DialogCustomMindMap />
      </Panel>

      <Background />
      <MiniMap />
      <Menubar rfInstance={rfInstance} />

      {mindMapLoadingRequest && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background/80">
          <ImSpinner8 className="z-50 h-10 w-10 animate-spin text-primary" />
        </div>
      )}
    </ReactFlow>
  );
};

export default MindMapCanvas;
