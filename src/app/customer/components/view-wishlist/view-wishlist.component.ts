import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss'],
})
export class ViewWishlistComponent {
  quantity: number | null = null;
  errorMessage: string | null = null;
  products: any[] = []; // Holds wishlist products
  
  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getwishlistByUserId();
    console.log("Constructor called");
  }
  
  // Fetch wishlist products by user ID
  getwishlistByUserId() {
    console.log('Fetching wishlist...');
    this.customerService.getWishlistByUserId().subscribe((res) => {
      this.products = res.map((element) => ({
        ...element,
        processedImg: 'data:image/jpeg;base64,' + element.returnedImg,
      }));
      console.log('Updated wishlist:', this.products);
    });
  }

  // Add product to cart
  addToCart(id: any) {
    // Fetch the quantity of the product
    this.customerService.getquantity(id).subscribe(
      (response) => {
        this.quantity = response; // Assuming the response is just the quantity
        this.errorMessage = null;
  
        // Check if the quantity is 0
      
        if (this.quantity === 0 || this.quantity === null) {
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

  // Remove product from wishlist
  RemoveFromWishlist(id: any) {
    console.log("Removing product from wishlist...");
    this.customerService.RemoveFromWishlist(id).subscribe(
      (res) => {
        if (res) {
          console.log('Wishlist item removed successfully:', res);
          this.getwishlistByUserId(); // Refresh the wishlist
        } else {
          console.error('Unexpected response:', res);
        }
      },
      (error) => {
        console.error('Error while removing wishlist item:', error);
      }
    );
  }
}
