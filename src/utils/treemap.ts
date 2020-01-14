import { NodeData } from "../model/NodeData";
import { Node } from '../model/Node';
import * as d3 from "d3";

export const treemap = (data: NodeData, width: number, height: number): Node => {

    function tile(node: d3.HierarchyRectangularNode<any>, x0: number, y0: number, x1: number, y1: number) {
        // d3.treemapBinary(node, 0, 0, width, height);
        // d3.treemapResquarify(node, 0, 0, width, height);
        d3.treemapSquarify(node, 0, 0, width, height);
        for (const child of (node.children || [])) {
            child.x0 = x0 + child.x0 / width * (x1 - x0);
            child.x1 = x0 + child.x1 / width * (x1 - x0);
            child.y0 = y0 + child.y0 / height * (y1 - y0);
            child.y1 = y0 + child.y1 / height * (y1 - y0);
        }
    }

    const value = (data: NodeData) => {
        return data.weight !== undefined ? data.weight : data.content ? 2 : 1; // 1;
    }

    return d3.treemap()
        .tile(tile)
        (d3.hierarchy(data)
            .sum(d => value(d))
            .sort((a, b) => (a.value || 0) - (b.value || 0))) as Node;
}