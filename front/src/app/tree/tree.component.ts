import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { SystemTree } from '../shared/models/system';

/**
 * Flattened tree node that has been created from a SystemTree through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  type: string;
  level: number;
  id: number,
  expandable: boolean;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule]
})
export class TreeComponent {
  @Input() data: SystemTree[] = [];
  @Output() openDialogAdd = new EventEmitter<SystemTree>();
  @Output() openDialogRemove = new EventEmitter<SystemTree>();
  @Output() openDialogEdit = new EventEmitter<SystemTree>();

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<SystemTree, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<SystemTree, FlatTreeNode>;
  dialog = inject(MatDialog);

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.data;
  }

  ngOnInit() {
    this.dataSource.data = this.data;
  }

  /** Transform the data to something the tree can read. */
  transformer(node: SystemTree, level: number): FlatTreeNode {
    return {
      name: node.name,
      id: node.id,
      type: node.type,
      level,
      expandable: node.children.length > 0
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode): number {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: SystemTree): SystemTree[] | null | undefined {
    return node.children;
  }
  openDialog(node: FlatTreeNode, addOrRemove = 'add') {
    const findObjectByIdRecursive: any = (lists: SystemTree[], id: number) => {
      for (const item of lists) {
        if (item.id === id) {
          return item;
        } else if (item.children.length > 0) {
          const found = findObjectByIdRecursive(item.children, id);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };
    const result = findObjectByIdRecursive(this.dataSource.data, node.id);
    if (result) {
      if (addOrRemove == 'add') {
        this.openDialogAdd.emit(result);
      } else if (addOrRemove === 'remove') {
        this.openDialogRemove.emit(result)
      } else {
        this.openDialogEdit.emit(result);
      }
    }
  }



}
