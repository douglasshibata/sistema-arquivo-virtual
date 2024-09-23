import { Component, inject, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { SystemTree } from '../../shared/models/system';

@Component({
  selector: 'app-dialog-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent {
  private fb = inject(FormBuilder);
  errorMessage = signal('');
  private dialogRef = inject(MatDialogRef<DialogFormComponent>)
  data: SystemTree | null = inject(MAT_DIALOG_DATA);
  toast = inject(ToastrService)
  systemManagerForm = this.fb.group({
    folder: [this.data ? this.data.type === 'folder' ? true : false : false, Validators.required],
    name: [this.data ? this.data.name ? this.data.name : null : null, Validators.required],
    id: [this.data ? this.data.id ? this.data.id : null : null]
  });

  onSubmit(): void {
    if (this.systemManagerForm.valid) {
      this.dialogRef.close(this.systemManagerForm.value)
    } else {
      if(this.systemManagerForm.controls.name.invalid){
        this.errorMessage.set('Preencha o nome');
      }
      this.toast.warning('Preencha os campos obrigatórios')
    }
  }
}
