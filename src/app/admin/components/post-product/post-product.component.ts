import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss'],
})
export class PostProductComponent implements OnInit {
  productForm: FormGroup;
  listofCategories: any[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  // Lifecycle hook, correct the typo here
  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    this.getAllCategories();
  }

  // Get categories from the backend
  getAllCategories(): void {
    this.adminService.getAllCategories().subscribe((res) => {
      this.listofCategories = res;
    });
  }

  // Handle file selection and preview
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  // Preview image after selection
  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Add product method with FormData for file upload
  addProduct(): void {
    if (this.productForm.valid && this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      this.adminService.addProduct(formData).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Product added successfully', 'Close', {
            duration: 5000,
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open(res.message, 'ERROR', {
            duration: 5000,
          });
        }
      });
    } else {
      for (const i in this.productForm.controls) {
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
}