
export type NodeType = 'dir' | 'data';
export interface NodeData {
    label : string;
    type : NodeType;
    id : string;
    src?: string;
    weight?:number;
    content?: string[];
    children? : NodeData[];
}

export interface NodeState {
    selected: boolean;
    hidden?:boolean;
}