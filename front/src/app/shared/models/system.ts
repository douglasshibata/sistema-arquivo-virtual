export interface System {
    id: number;
    folder: boolean;
    name: string;
    nodeChild: System[];
    nodeParent: System;
}


export interface SystemTree {
    name: string,
    id: number,
    type: 'folder' | 'file',
    children: SystemTree[],
    nodeParent: System,
}