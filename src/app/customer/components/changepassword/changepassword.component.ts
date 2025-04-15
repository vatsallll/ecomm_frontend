import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
  passwordForm: FormGroup;
  //snackBar: any;

  constructor(
    private dialogRef: MatDialogRef<ChangepasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
  ) {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', [Validators.required]]
      },
      {
        validator: this.passwordMatchValidator
      }
    );
  }

  // Custom validator to check if newPassword and confirmNewPassword match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmNewPassword = group.get('confirmNewPassword')?.value;

    if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  save(): void {
    if (this.passwordForm.valid) {
      const formData = {
        oldPassword: this.passwordForm.value.oldPassword,
        newPassword: this.passwordForm.value.newPassword
      };

      // Call the service to change the password
      this.customerService.changePassword( formData).subscribe(
        (response) => {
          console.log('Password changed successfully', response);
          this.snackBar.open('Password changed successfully', 'Close', {
            duration: 5000,
          });
          this.dialogRef.close();  // Close the dialog on success
        },
        (error) => {
          console.error('Error changing password', error);
          this.snackBar.open('Error changing password', 'Close', {
            duration: 5000,
          });
          // Optionally display a message to the user about the error
        }
      );
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
