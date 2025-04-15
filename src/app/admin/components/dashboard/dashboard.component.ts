import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  products: any[] = [];
  searchProductForm!: FormGroup;
  totalElements: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  isLoading: boolean = false;
  sort: string = 'id,asc'; // Default sort by ID in ascending order

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}



  ngOnInit() {
    // Load all products initially
    this.getAllProducts(this.currentPage, this.pageSize, this.sort);
  
    // Initialize the search form
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]],
    });
  
    // Listen to the valueChanges on the title field with debounce
    this.searchProductForm
      .get('title')
      ?.valueChanges.pipe(debounceTime(300)) // Wait for 300ms after user stops typing
      .subscribe((value: string) => {
        this.products = [];
        if (value && value.trim().length > 0) {
          // Call backend to fetch products by name with pagination
          this.adminService
            .getAllProductsByName(value.trim(), this.currentPage, this.pageSize, this.sort)
            .subscribe(
              (res) => {
                console.log('Backend Response for Search:', res); // Debug log
  
                // Map and process products with images
                this.products = res.content.map((element: any) => ({
                  ...element,
                  categoryName: element.categoryName,
                  processedImg: element.byteImg
                    ? `data:image/jpeg;base64,${element.byteImg}` // Use `img` for image data
                    : 'assets/default-image.jpg', // Fallback to default
                }));
  
                this.totalElements = res.totalElements; // Update total elements for pagination
              },
              (error) => {
                console.error('Error fetching products by name:', error);
                this.snackBar.open(
                  'Failed to fetch products. Please try again.',
                  'Close',
                  { duration: 5000, panelClass: 'error-snackbar' }
                );
              }
            );
        } else {
          // If search input is cleared, reload all products
          this.getAllProducts(this.currentPage, this.pageSize, this.sort);
        }
      });
  }
  
  
  

  getAllProducts(page: number, size: number, sort: string) {
    this.products = [];
    this.adminService.getAllProducts(page, size, sort).subscribe((res) => {
      console.log('Backend Response:', res); // Log for debugging
      this.products = res.content.map((element: any) => ({
        ...element,
        categoryName: element.categoryName,
        processedImg: element.byteImg ? `data:image/jpeg;base64,${element.byteImg}` : null,
      }));
      this.totalElements = res.totalElements;
      console.log('Processed Products:', this.products);
    });
  }
  
  
  
  submitForm() {
    const title = this.searchProductForm.get('title')!.value;
    this.products = [];
    this.adminService.getAllProductsByName(title,this.currentPage, this.pageSize, this.sort ).subscribe((res) => {
      console.log('Backend Response:', res);
  
      // Ensure no product without an image causes issues
      this.products = res.content.map((element: any) => ({
        ...element,
        processedImg: element.byteImg
          ? `data:image/jpeg;base64,${element.byteImg}`
          : 'assets/placeholder.png', // Fallback image for missing data
      }));
  
      console.log('Processed Products:', this.products);
    });
  }
  
  

  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).subscribe({
      next: (res) => {
        if (res.status === 204) { // HTTP 204: No Content
          this.snackBar.open('Product Deleted Successfully!', 'Close', {
            duration: 5000,
          });
          this.getAllProducts(this.currentPage, this.pageSize, this.sort);
        }
      },
      error: (err) => {
        if (err.status === 404) { // Product not found
          this.snackBar.open('Product not found!', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
        } else {
          console.error('Unexpected error:', err);
        }
      },
    });
  }
  

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllProducts(this.currentPage, this.pageSize, this.sort);
  }

  onSortChange(sortField: string, sortDirection: string) {
    this.sort = `${sortField},${sortDirection}`;
    this.getAllProducts(this.currentPage, this.pageSize, this.sort);
  }
}

