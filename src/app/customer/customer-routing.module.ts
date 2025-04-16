import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewOrderedProductsComponent } from './components/view-ordered-products/view-ordered-products.component';
import { ReviewOrderedProductComponent } from './components/review-ordered-product/review-ordered-product.component';
import { ViewProductDetailComponent } from './components/view-product-detail/view-product-detail.component';
import { ViewWishlistComponent } from './components/view-wishlist/view-wishlist.component';

import {CustomerGuard} from './customerguard.guard';
const routes: Routes = [
  { path: '', component: CustomerComponent, canActivate: [CustomerGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [CustomerGuard] },
  { path: 'cart', component: CartComponent, canActivate: [CustomerGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [CustomerGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [CustomerGuard] },
  {
    path: 'ordered_products/:orderId',
    component: ViewOrderedProductsComponent,
    canActivate: [CustomerGuard],
  },
  { path: 'review/:productId', component: ReviewOrderedProductComponent, canActivate: [CustomerGuard] },
  { path: 'product/:productId', component: ViewProductDetailComponent, canActivate: [CustomerGuard] },
  { path: 'wishlist', component: ViewWishlistComponent, canActivate: [CustomerGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
