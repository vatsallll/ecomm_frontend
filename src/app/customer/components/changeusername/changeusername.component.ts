import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-username-dialog',
  templateUrl: './changeusername.component.html',
  styleUrls: ['./changeusername.component.scss']
})
export class ChangeusernameComponent {
  usernameForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ChangeusernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.usernameForm = this.fb.group({
      username: [data.currentUsername, [Validators.required, Validators.minLength(3)]]
    });
  }

  save(): void {
    if (this.usernameForm.valid) {
      this.dialogRef.close(this.usernameForm.value.username);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
