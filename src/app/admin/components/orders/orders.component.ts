import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrderedProductsComponent } from '../view-ordered-products/view-ordered-products.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  orders: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
     public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getPlacedOrders();
  }

  getPlacedOrders() {
    this.adminService.getPlacedOrders().subscribe((res) => {
      this.orders = res;
    });
  }
  changeOrderStatus(orderId: number, status: string) {
    this.adminService.changeOrderStatus(orderId, status).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Order Status changed successfully', 'Close', {
          duration: 5000,
        });
        this.getPlacedOrders();
      } else {
        this.snackBar.open('Failed to change order status', 'Close', {
          duration: 5000,
        });
      }
    });
  }

  viewOrder(orderId: number): void {
    this.dialog.open(ViewOrderedProductsComponent, {
      width: '500px', // Optional: Adjust dialog width
      data: { orderId: orderId } // Pass the orderId as data
    });
  }
  
}