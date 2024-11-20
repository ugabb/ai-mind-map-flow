import { Edge, Node, ReactFlowJsonObject } from "@xyflow/react";

export interface MindMap {
    nodes: Node[];
    edges: Edge[];
    viewport: {
        x: number;
        y: number;
        zoom: number;
    }
}

export interface MindMapResponse {
    id: string;
    title: string;
    mindMap: ReactFlowJsonObject<Node, Edge> | string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}
