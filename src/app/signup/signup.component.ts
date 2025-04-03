import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      this.snackBar.open('Passwords do not match.', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar',
      });
      return;
    }

    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        console.log('Success Response:', response); // Debugging
        this.snackBar.open('Registration successful!', 'Close', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error Response:', error); // Debugging
        this.snackBar.open('Registration failed. Please try again.', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    );
    
  }
}
