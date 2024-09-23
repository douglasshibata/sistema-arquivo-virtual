import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
  private dialogRef = inject(MatDialogRef<DialogFormComponent>)
  systemManagerForm = this.fb.group({
    folder: [false, Validators.required],
    name: [null, Validators.required],
  });

  onSubmit(): void {
    this.dialogRef.close(this.systemManagerForm.value)
  }
}
