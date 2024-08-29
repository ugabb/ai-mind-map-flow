"use client"

import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  ConnectionMode,
  Connection,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Squaree from '@/components/Squaree';
import DefaultEdge from '@/components/edges/DefaultEdges';
import convertJsonToTree from '@/utils/convertJsonToTree';
import convertTreeToNodes from '@/utils/convertTreeToNodes';

import {json} from "@/json"
import ELK from "elkjs/lib/elk.bundled.js";

const elk = new ELK(); 

//Elk options for layouting the tree
const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "200",
  "elk.spacing.nodeNode": "150",
  "elk.edgeRouting": "SPLINES",
  'elk.layered.nodePlacement.strategy': 'SIMPLE'
};

/**
 * 
 * @param {*} nodes array of nodes from store 
 * @param {*} edges array of edges from store
 * @param {*} options options from elkOptions. Used for layouting tree
 * @returns promises that contains array of nodes or edges that already get layouted or repositioned
 */
const getLayoutedElements = (nodes: any[], edges: any[], options = {}) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  console.log(isHorizontal)
  const graph = {
    id: "root",
    layoutOptions: options,
    //Passed array of nodes that contains target position and source position. The target position and source position change based on isHorizontal  
    children: nodes.map((node) => ({
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      //Hardcode a width and height for node so that elk can use it when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  // console.log(graph);

  //Return promises
  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => {
        console.log("ELKS",node)

        return {
          ...node,
          // React Flow expects a position property on the node instead of `x` and `y` fields.
          position: { x: node.x, y: node.y },
        }
      }),
      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};


// const initialNodes = [
//   { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 }, type: 'square', width: 200, height: 200 },
//   { id: '2', data: { label: 'Node 2' }, position: { x: 0, y: 50 }, type: 'square', width: 200, height: 200 },
//   { id: '3', data: { label: 'Node 2' }, position: { x: 100, y: 50 }, type: 'square', width: 200, height: 200 }
// ] satisfies Node[];

const nodeTypes = { square: Squaree }; 
const edgesTypes = { default: DefaultEdge }; 

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export const SaveRestore = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

    /**
   * @param {*} direction an object contains direction. for elkjs to know which direction layouting to use for the tree
   * @param {*} initialNodes array of nodes and edges [nodes, edges] .Using this because variable "nodes" from state still empty for the first time 
   */
    const onLayout = useCallback(
      ({ direction }, initialNodes: any[][] | null = null) => {
  
        //Add direction to options for the direction of the tree
        const opts = { "elk.direction": direction, ...elkOptions };
        //initial nodes return [nodes, edges]
        console.log("render on ");
        const ns = initialNodes === null ? nodes : initialNodes[0];
        const es = initialNodes === null ? edges : initialNodes[1];
        getLayoutedElements(ns, es, opts).then(
          ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
            console.log("layoutedNodes", layoutedNodes, "layoutedEdges", layoutedEdges);
            //add layouted or repositioned nodes and edges to store, so that react flow will render the layouted or repositioned nodes and edges 
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
  
          }
        );
      },
      [nodes, edges]   //So that the useCallback will rememoize the nodes and edges variable if it values changed.
    );

    useLayoutEffect(() => {
      const nodeTree = convertJsonToTree(json); //to convert json to tree
      let convertedNodes = convertTreeToNodes(nodeTree, true); //to convert tree to nodes
      onLayout({ direction: "DOWN" }, convertedNodes); 
  
      //so that when needToRenderJson change, useLayoutEffect wil reexecute the callback. needToRenderJson change everytime user click run button in the page. The run button is in sidebar component.
    }, [json]);   
  

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgesTypes}
      defaultEdgeOptions={{
        type: 'default',
      }}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionMode={ConnectionMode.Loose}
      // onInit={setRfInstance}
      fitView
      fitViewOptions={{ padding: 2 }}
      className='h-screen w-screen'
    >
        <Background />
    </ReactFlow>
  );
};

