import { Edge, Node } from "@xyflow/react";

export interface MindMap {
    nodes: Node[];
    edges: Edge[];
    viewport: {
        x: number;
        y: number;
        zoom: number;
    }
}
