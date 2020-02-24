import { Node } from './../model/Node';

export const isTextNode = (node : Node) => {
    return node.data.content !== undefined;
}

export const getTextNodeContent = (node : Node) : string[] => {
    return node.data.content || [''];
}

export const isImageNode = (node : Node) => {
    return node.data.src !== undefined;
}

export const getImageNodeSrc = (node : Node) : string => {
    if (node.data.label === 'about') return '';
    return node.data.src || '';
}

export const getNodeLabel = (node : Node) : string => {
    return node.data.label || '';
}

export const isDirectoryNode = (node : Node) => {
    return node.data.type === 'dir';
}

export const isDataNode = (node : Node) => {
    return node.data.type === 'data';
}

export const isNodeBranch = (node : Node) : boolean => {
    if (!node.data.children) return false;
    for (let i = 0; i<node.data.children.length; i++) {
        if (node.data.children[i].type === 'dir') {
            return false;
        }
    }
    return true;
}

export const isNodeLeaf = (node : Node) : boolean => {
    return !node.data.children;
}