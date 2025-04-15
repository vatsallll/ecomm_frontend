import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomerService } from "../../services/customer.service";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { finalize } from "rxjs";

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent {
  orderId: number;
  orderForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderId = data.orderId;
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null],
    });
  }
  placeOrder() {
    this.customerService.updateproductquantity(this.orderId).pipe(
      finalize(() => {
        // This block will run regardless of the result of updateproductquantity
        this.customerService.placeOrder(this.orderForm.value).subscribe(
          (res) => {
            if (res.id != null) {
              this.snackBar.open('Order placed successfully', 'Close', {
                duration: 5000,
              });
              this.router.navigateByUrl('/customer/my-orders');
              this.closeForm();
            } else {
              this.snackBar.open('Something went wrong', 'Close', {
                duration: 5000,
              });
            }
          },
          (error) => {
            console.error('Error placing order:', error);
            this.snackBar.open('Failed to place order', 'Close', {
              duration: 5000,
            });
          }
        );
      })
    ).subscribe(
      (res) => {
        console.log('Product quantities updated successfully:', res);
      },
      (error) => {
        console.error('Error updating product quantities:', error);
        this.snackBar.open('Failed to update product quantities', 'Close', {
          duration: 5000,
        });
      }
    );
  }
  
  closeForm() {
    this.dialog.closeAll();
  }
}
  