import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { DialogFormComponent } from './dialog/dialog-form/dialog-form.component';
import { ResponseError } from './shared/models/response-error';
import { System, SystemTree } from './shared/models/system';
import { SystemManagerService } from './shared/services/system-manager.service';
import { TreeComponent } from "./tree/tree.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TreeComponent, MatToolbar, MatIcon, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  service = inject(SystemManagerService);
  dialog = inject(MatDialog);
  spinner = inject(NgxSpinnerService);
  toastr = inject(ToastrService);
  data: SystemTree[] = [];
  constructor() {
    this.getSystem();
  }

  getSystem() {
    this.spinner.show();
    this.service.getSystem().subscribe({
      next: (res) => {
        const responseTree: SystemTree[] = this.getTreeStruct(res, null)
        this.data = responseTree;
      },
      error: (err: ResponseError) => {
        console.error(err);
        this.toastr.error(err.message);
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    })
  }
  private getTreeStruct(res: System[], parent: System | null): any[] {
    return res.map((value) => ({
      children: this.getTreeStruct(value?.nodeChild, value),
      name: value.name,
      type: value.folder ? 'folder' : 'file',
      id: value.id,
      nodeParent: parent ? {
        folder: parent.folder,
        id: parent.id,
        name: parent.name,
      } : value.nodeParent,
    }));
  }
  private getSystemStruct(res: SystemTree[]): System[] {
    return res.map((v) => ({
      folder: v.type === 'folder', id: v.id, name: v.name, nodeChild: this.getSystemStruct(v.children), nodeParent: v.nodeParent,

    }));
  }

  openDialog(node: SystemTree | null) {
    this.dialog.open(DialogFormComponent).afterClosed().subscribe({
      next: (res) => {
        if (res) {
          if (node) {
            const obj: System = {
              folder: node.type === 'folder',
              id: node.id,
              name: node.name,
              nodeChild: this.getSystemStruct(node.children),
              nodeParent: node.nodeParent
            }
            obj.nodeChild.push(res);
            this.save(obj);
          } else {
            this.save(res);
          }
        }
      }
    });
  }

  save(system: System) {
    this.spinner.show();
    this.service.persist(system).subscribe({
      next: (res) => {
        this.toastr.success('Salvo com sucesso');
        console.log(res)
        this.getSystem();
      },
      error: (err: ResponseError) => {
        console.error(err);
        this.toastr.error(err.message);
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    })
  }

  remove(system: SystemTree) {
    console.log(system)
    this.spinner.show();
    this.service.remove(system.id).subscribe({
      next: () => {
        this.toastr.success('Removido com sucesso');
        this.getSystem();
      },
      error: (err: ResponseError) => {
        console.error(err);
        this.toastr.error(err.message);
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    })
  }
}
