import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMaterailModule } from '../DemoAngularMaterialModule';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { PostProductFaqComponent } from './components/post-product-faq/post-product-faq.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { OrderByStatusComponent } from './components/analytics/order-by-status/order-by-status.component';
import { ViewOrderedProductsComponent } from './components/view-ordered-products/view-ordered-products.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    PostCategoryComponent,
    PostProductComponent,
    OrdersComponent,
    UpdateProductComponent,
    PostProductFaqComponent,
    AnalyticsComponent,
    OrderByStatusComponent,
    ViewOrderedProductsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterailModule
  ]
})
export class AdminModule { }
