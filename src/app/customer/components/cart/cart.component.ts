import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems: any[] = [];
  order: any;
  quantityy: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): Promise<void> {
    return new Promise((resolve) => {
      this.cartItems = [];
      this.customerService.getCartByUserId().subscribe((res) => {
        this.order = res;
        res.cartItems.forEach((element) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.cartItems.push(element);
        });
        resolve(); // Resolve the promise after cartItems is populated
      });
    });
  }
  

  increaseQuantity(productId: any,quantity : any) {
    this.customerService.getquantity(productId).subscribe(
      (response) => {
        this.quantityy = response; // Assuming the response is just the quantity
        console.log(response);
        this.errorMessage = null;
  
        // Check if the quantity is 0
        if (this.quantityy <= quantity ) {
          this.snackbar.open('Out of stock', 'Close', { duration: 5000 });
          // Optionally, refresh the page after showing the message

          const idd = this.order.id;
            this.customerService.postquantity(productId, this.quantityy,idd).subscribe(
              (response) => {
                // Success response handling
              
                // Optionally refresh the cart or perform other actions
                 this.getCart();
              },
              (error) => {
                // Error handling
                this.errorMessage = error.error || 'Error updating quantity';
                console.error('Error updating quantity:', error);
                this.snackbar.open(this.errorMessage, 'Close', {
                  duration: 5000,
                });
              }
            );
          // setTimeout(() => {
          //   location.reload(); // This will reload the page after 5 seconds
          // }, 2000);
          return; // Exit the function early if the item is out of stock
        }
        else{
  
        // Proceed to increase quantity if the item is not out of stock
        this.customerService.increaseProductQuantity(productId).subscribe(
          (res) => {
            this.snackbar.open('Product quantity increased.', 'Close', { duration: 5000 });
            this.getCart(); // Refresh the cart after increasing quantity
          },
          (error) => {
            this.errorMessage = error.error || 'Error increasing quantity';
            console.error('Error increasing quantity:', error);
          }
        );
      }
      },
      (error) => {
        this.quantityy = null;
        this.errorMessage = error.error || 'Error fetching quantity';
        console.error('Error fetching quantity:', error);
      }
    );
  }
  


  decreaseQuantity(productId: any,quantity : any) {
    this.customerService.getquantity(productId).subscribe(
      (response) => {
        this.quantityy = response; // Assuming the response is just the quantity
        console.log(response);
        this.errorMessage = null;
       
        // Check if the quantity is 0
        if (this.quantityy < quantity ) {
          this.snackbar.open('Out of stock', 'Close', { duration: 5000 });
          // Optionally, refresh the page after showing the message

          const idd = this.order.id;
            this.customerService.postquantity(productId, this.quantityy,idd).subscribe(
              (response) => {
                // Success response handling
                
                // Optionally refresh the cart or perform other actions
                 this.getCart();
              },
              (error) => {
                // Error handling
                this.errorMessage = error.error || 'Error updating quantity';
                console.error('Error updating quantity:', error);
                this.snackbar.open(this.errorMessage, 'Close', {
                  duration: 5000,
                });
              }
            );
          // setTimeout(() => {
          //   location.reload(); // This will reload the page after 5 seconds
          // }, 2000);
          return; // Exit the function early if the item is out of stock
        }
        else{
  
        // Proceed to increase quantity if the item is not out of stock
        this.customerService.decreaseProductQuantity(productId).subscribe(
          (res) => {
           
            this.getCart(); // Refresh the cart after increasing quantity
          },
          (error) => {
            this.errorMessage = error.error || 'Error increasing quantity';
            console.error('Error increasing quantity:', error);
          }
        );
      }
      },
      (error) => {
        this.quantityy = null;
        this.errorMessage = error.error || 'Error fetching quantity';
        console.error('Error fetching quantity:', error);
      }
    );
  }
  deleteProduct(productId: any) {
    this.customerService.deleteProduct(productId).subscribe(
        (res) => {
            console.log('✅ Product deleted successfully:', res);
            this.snackbar.open("Product deleted from cart", "Close", {
                duration: 5000,
            });
            // Refresh cart after deletion
            this.getCart();
        },
        (error) => {
            console.error('❌ Product deletion failed:', error);
            this.snackbar.open("Failed to delete product from cart", "Close", {
                duration: 5000,
            });
        }
    );
}
async placeOrder() {
  await this.getCart(); // Wait for getCart to complete
  console.log(this.cartItems.length);
  
  if (this.cartItems.length === 0) {
    console.log("Sorry, the cart is empty");
  } else {
    const orderId = this.order.id; // Extract the order ID
    this.dialog.open(PlaceOrderComponent, {
      data: { orderId: orderId }, // Pass the order ID
    });
  }
}

}