import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UpdateProductComponent } from './admin/components/update-product/update-product.component';
import { AuthGuard } from './auth.guard';
import { TrackOrderComponent } from './track-order/track-order.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    //canActivate: [AuthGuard], // Prevent logged-in users from accessing login
  },
  {
    path: 'signup',
    component: SignupComponent,
    //canActivate: [AuthGuard], // Prevent logged-in users from accessing signup
  },
  {
    path: 'order',
    component: TrackOrderComponent,
    //canActivate: [AuthGuard], // Prevent logged-in users from accessing order
  },
  {
    path: 'customer',
    canActivate: [AuthGuard], // Allow access only to logged-in users
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard], // Allow access only to logged-in users
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full', // Redirect to login for empty path
  // },
  {
    path: '**',
    redirectTo: 'login', // Redirect any unknown routes to login
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
