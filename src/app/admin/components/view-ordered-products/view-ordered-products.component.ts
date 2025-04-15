import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrls: ['./view-ordered-products.component.scss'],
})
export class ViewOrderedProductsComponent {
  orderId: number;
  orderedProductDetailsList = [];
  totalAmount: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number },
    private adminService: AdminService,
    private dialogRef: MatDialogRef<ViewOrderedProductsComponent>
  ) {
    this.orderId = data.orderId; // Access the passed orderId
  }

  ngOnInit() {
    this.getOrderedProductsDetailsByOrderId();
  }

  getOrderedProductsDetailsByOrderId() {
    this.adminService.getOrderedProducts(this.orderId).subscribe((res) => {
      console.log(res);
      res.productDtoList.forEach((element) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.orderedProductDetailsList.push(element);
      });
      this.totalAmount = res.orderAmount;
    });
  }

  closeDialog() {
    this.dialogRef.close(); 
  }
}
