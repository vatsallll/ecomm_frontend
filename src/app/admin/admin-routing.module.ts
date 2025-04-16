import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { OrdersComponent } from './components/orders/orders.component';
//import { PostProductFaqComponent } from './components/post-product-faq/post-product-faq.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { PostProductFaqComponent } from './components/post-product-faq/post-product-faq.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AdminGuard } from './adminguard.guard';

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'category', component: PostCategoryComponent, canActivate: [AdminGuard] },
  { path: 'product', component: PostProductComponent, canActivate: [AdminGuard] },
  { path: 'product/:productId', component: UpdateProductComponent, canActivate: [AdminGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AdminGuard] },
  { path: 'faq/:productId', component: PostProductFaqComponent, canActivate: [AdminGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [AdminGuard] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}