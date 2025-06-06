import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss'],
})
export class ViewProductDetailComponent {
  productId: number = this.activatedRoute.snapshot.params['productId'];

  product: any;
  FAQS: any[] = [];
  reviews: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProductDetailById();
  }

  getProductDetailById() {
    this.customerService
      .getProductDetailById(this.productId)
      .subscribe((res) => {
        this.product = res.productDto;
        this.product.processedImg =
          'data:image/png;base64,' + res.productDto.byteImg;

        this.FAQS = res.faqDtoList;

        res.reviewDtoList.forEach((element) => {
          element.processedImg = 'data:image/png;base64,' + element.returnedImg;
          this.reviews.push(element);
        });
      });
  }

  addToWishlist() {
    const wishListDto = {
      productId: this.productId,
      userId: UserStorageService.getUserId(),
    };
    this.customerService.addProductToWishlist(wishListDto).subscribe({
      next: (res) => {
        if (res.id != null) {
          this.snackBar.open('Product Added to Wishlist Successfully!', 'Close', {
            duration: 5000,
          });
        }
      },
      error: (err) => {
        if (err.status === 409) {
          this.snackBar.open('Already in Wishlist', 'ERROR', {
            duration: 5000,
          });
        } else {
          this.snackBar.open('An unexpected error occurred', 'ERROR', {
            duration: 5000,
          });
        }
      }
    });
  }
    
  
}