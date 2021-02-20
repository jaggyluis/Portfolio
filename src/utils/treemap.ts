import { NodeData } from "../model/NodeData";
import { Node } from '../model/Node';
import * as d3 from "d3";

export const treemap = (data: NodeData, w: number, h: number): Node => {

    let width = w;
    let height = h;

    const children = data.children || [];

    if (w <= 600) {
        height *= Math.ceil(children.length / 6) ;
    } else {
        height *= Math.ceil(children.length / 12);
    }
    
    function tile(node: d3.HierarchyRectangularNode<any>, x0: number, y0: number, x1: number, y1: number) {
        d3.treemapBinary(node, 0, 0, width, height);
        // d3.treemapResquarify(node, 0, 0, width, height);
        // d3.treemapSquarify(node, 0, 0, width, height);
        for (const child of (node.children || [])) {
            child.x0 = x0 + child.x0 / width * (x1 - x0);
            child.x1 = x0 + child.x1 / width * (x1 - x0);
            child.y0 = y0 + child.y0 / height * (y1 - y0);
            child.y1 = y0 + child.y1 / height * (y1 - y0);
        }
    }

    const value = (nodeData: NodeData) => {
        return 1;
    }

    const accessor = (nodeData : NodeData) => {
        if (data.id == nodeData.id) {
            return nodeData.children
        }
        return [];
    }

    const compare = (a : d3.HierarchyNode<NodeData>, b : d3.HierarchyNode<NodeData> ) : number => {
        // if (a.data.content) return -1;
        if (b.data.label === 'computation') return -1;
        return 1;
        // return (b.value || 0) - (a.value || 0);
    }

    return d3.treemap()
        .tile(tile)
        (d3.hierarchy(data, accessor)
            .sum(d => value(d))
            .sort(compare)) as Node;
}