import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs';
import { AdminService } from 'src/app/admin/service/admin.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  products: any[] = [];
  searchProductForm!: FormGroup;
  quantity: number | null = null;
  errorMessage: string | null = null;

  totalElements: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  isLoading: boolean = false;
  sort: string = 'id,asc'; // Default sort by ID in ascending order

  constructor(
    private customerService: CustomerService,
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
          this.customerService
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
    this.customerService.getAllProducts(page, size, sort).subscribe((res) => {
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
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.customerService.getAllProductsByName(title,this.currentPage, this.pageSize, this.sort ).subscribe((res)  => {
      res.forEach((element) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    });
  }

  addToCart(id: any) {
    // Fetch the quantity of the product
    this.customerService.getquantity(id).subscribe(
      (response) => {
        this.quantity = response; // Assuming the response is just the quantity
        this.errorMessage = null;
  
        // Check if the quantity is 0
      
        if (this.quantity === 0) {
          this.snackBar.open('Out of stock', 'Close', { duration: 5000 });
          // Optionally, refresh the page after showing the message
          setTimeout(() => {
            location.reload(); // This will reload the page after 5 seconds
          }, 2000);
          return; // Exit the function early if the item is out of stock
        }
  
        // If quantity is not 0, proceed to add to cart
        this.customerService.addToCart(id).subscribe((res) => {
          this.snackBar.open('Product in cart', 'Close', { duration: 5000 });
        });
      },
      (error) => {
        this.quantity = null;
        this.errorMessage = error.error || 'Error fetching quantity';
        console.error('Error fetching quantity:', error);
      }
    );
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
