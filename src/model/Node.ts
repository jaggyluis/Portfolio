import { NodeData } from './NodeData';

export interface Node {
    data: NodeData;
    height: number;
    depth: number;
    parent: Node | null;
    children?: Node[];
    value: number;
    x0: number;
    x1: number;
    y0: number;
    y1: number;
}