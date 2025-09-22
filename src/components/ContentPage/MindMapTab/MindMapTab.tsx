"use client";

import { useState, useCallback, useLayoutEffect } from "react";
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
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Square } from "@/components/Custom Nodes/Square/Squaree";
import { DefaultEdge } from "@/components/edges/DefaultEdges";
import convertJsonToReactFlow from "@/utils/convertJsonToReactFlow";
import ELK from "elkjs/lib/elk.bundled.js";
import { useNodeStore } from "@/store/NodeStore";
import { ImSpinner8 } from "react-icons/im";
import toast from "react-hot-toast";
import { Menubar } from "@/components/Menubar";
import { EmptyMindMap } from "./EmptyMindMap";
import { useContentContext } from "../ContentContext";

const elk = new ELK();

//Elk options for layouting the tree
const elkOptions = {
  "elk.algorithm": "mrtree",
  "elk.layered.spacing.nodeNodeBetweenLayers": "200",
  "elk.spacing.nodeNode": "150",
  "elk.edgeRouting": "SPLINES",
  "elk.layered.nodePlacement.strategy": "SIMPLE",
  "elk.mrtree.edgeRoutingMode": "AVOID_OVERLAP",
  "elk.animate": "true",
};

/**
 *
 * @param {*} nodes array of nodes from store
 * @param {*} edges array of edges from store
 * @param {*} options options from elkOptions. Used for layouting tree
 * @returns promises that contains array of nodes or edges that already get layouted or repositioned
 */
const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  options = elkOptions
) => {
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout direction
      // and the element's position relative to its parent
      targetPosition: "top" as const,
      sourcePosition: "bottom" as const,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes:
        layoutedGraph.children?.map((node) => ({
          ...node,
          // React Flow expects a position property (not x, y)
          position: { x: node.x, y: node.y },
        })) || [],
      edges: layoutedGraph.edges,
    }))
    .catch((error) => {
      console.error("Error layouting the graph:", error);
      return null;
    });
};

const nodeTypes = { square: Square };
const edgesTypes = { default: DefaultEdge };

export function MindMapTab() {
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
    [setNodes, setEdges]
  );

  useLayoutEffect(() => {
    console.log("mindMapToGenerate", mindMapToGenerate);
    if (mindMapToGenerate) {
      const [newNodes, newEdges] = convertJsonToReactFlow(mindMapToGenerate);
      setNodes(newNodes);
      setEdges(newEdges);
      onLayout({ direction: "DOWN" }, [newNodes, newEdges]);
    }
  }, [mindMapToGenerate]);

  useLayoutEffect(() => {
    if (currentMindMap) {
      const [newNodes, newEdges] = convertJsonToReactFlow(currentMindMap);
      setNodes(newNodes);
      setEdges(newEdges);
      onLayout({ direction: "DOWN" }, [newNodes, newEdges]);
    }
  }, [currentMindMap]);

  return (
    <div className="h-full border rounded-lg overflow-hidden">
      {nodes.length === 0 && <EmptyMindMap />}

      {nodes.length > 0 && (
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
              color: "hsl(var(--muted-foreground))",
            },
          }}
          onInit={setRfInstance}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{ padding: 2 }}
          className="h-full w-full"
          onMouseMove={handleMouseMove}
          panOnDrag={false}
          panOnScroll
          selectionOnDrag
        >
          {isCreatingNode && (
            <div
              className="bg-primary/20 rounded min-w-[200px] min-h-[200px]"
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
          <MiniMap />
          <Menubar rfInstance={rfInstance} />

          {mindMapLoadingRequest && (
            <div className="fixed inset-0 flex items-center justify-center z-[999] bg-background/80">
              <ImSpinner8 className="w-10 h-10 text-primary animate-spin z-50" />
            </div>
          )}
        </ReactFlow>
      )}
    </div>
  );
}
