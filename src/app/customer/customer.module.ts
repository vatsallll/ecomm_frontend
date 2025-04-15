import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterailModule } from '../DemoAngularMaterialModule';
import { CartComponent } from './components/cart/cart.component';
//import { PlaceorderComponent } from './components/placeorder/placeorder.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangeusernameComponent } from './components/changeusername/changeusername.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ReviewOrderedProductComponent } from './components/review-ordered-product/review-ordered-product.component';
import { ViewOrderedProductsComponent } from './components/view-ordered-products/view-ordered-products.component';
import { ViewProductDetailComponent } from './components/view-product-detail/view-product-detail.component';
import { ViewWishlistComponent } from './components/view-wishlist/view-wishlist.component';

@NgModule({
  declarations: [CustomerComponent, DashboardComponent, CartComponent, PlaceOrderComponent, PlaceOrderComponent, MyOrdersComponent, ProfileComponent, ChangeusernameComponent, ChangepasswordComponent, ReviewOrderedProductComponent, ViewOrderedProductsComponent, ViewProductDetailComponent, ViewWishlistComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterailModule,
  ],
})
export class CustomerModule {}
