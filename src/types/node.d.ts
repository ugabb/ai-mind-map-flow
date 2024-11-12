import type { Node } from './nodes.d.ts';

export type ExtendedNode<NodeData extends Record<string, unknown> = Record<string, unknown>, NodeType extends string = string> = Node<NodeData, NodeType> & {
    textColor?: string;

};
