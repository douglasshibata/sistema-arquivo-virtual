import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DialogConfirmComponent } from '../dialog/dialog-confirm/dialog-confirm.component';
import { DialogFormComponent } from '../dialog/dialog-form/dialog-form.component';
import { ResponseError } from '../shared/models/response-error';
import { System, SystemTree } from '../shared/models/system';
import { SystemManagerService } from '../shared/services/system-manager.service';
import { TreeComponent } from '../tree/tree.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TreeComponent, MatToolbar, MatIcon, NgxSpinnerModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  service = inject(SystemManagerService);
  dialog = inject(MatDialog);
  spinner = inject(NgxSpinnerService);
  toastr = inject(ToastrService);
  data: SystemTree[] = [];
  ngOnInit() {
    this.data = [];
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

  openDialog(node: SystemTree | null, isEditMode = false) {
    this.dialog.open(DialogFormComponent, {
      data: isEditMode ? node : null
    }).afterClosed().subscribe({
      next: (res) => {
        if (res) {
          if (node) {
            if (isEditMode) {
              this.save(res);
            } else {
              const obj: System = {
                folder: node.type === 'folder',
                id: node.id,
                name: node.name,
                nodeChild: this.getSystemStruct(node.children),
                nodeParent: node.nodeParent
              }
              obj.nodeChild.push(res);
              this.save(obj);
            }
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
        if (res)
          this.toastr.success('Salvo com sucesso');
        this.ngOnInit();
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
    this.dialog.open(DialogConfirmComponent).afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.spinner.show();
          this.service.remove(system.id).subscribe({
            next: () => {
              this.toastr.success('Removido com sucesso');
              this.ngOnInit();
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
    })
  }
}
