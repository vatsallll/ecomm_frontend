import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UpdateProductComponent } from './admin/components/update-product/update-product.component';
import { AuthGuard } from './auth.guard';
import { TrackOrderComponent } from './track-order/track-order.component';
import { UserStorageService } from './services/storage/user-storage.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      () => {
        const isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
        const isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        const router = inject(Router);
  
        if (isAdminLoggedIn) {
          router.navigate(['/admin/dashboard']); // Redirect to admin dashboard
          return false; // Prevent access to login
        }
  
        if (isCustomerLoggedIn) {
          router.navigate(['/customer/dashboard']); // Redirect to customer dashboard
          return false; // Prevent access to login
        }
  
        return true; // Allow access to login
      }
    ]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [
      () => {
        const isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
        const isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        const router = inject(Router);
  
        if (isAdminLoggedIn) {
          router.navigate(['/admin/dashboard']); // Redirect to admin dashboard
          return false; // Prevent access to login
        }
  
        if (isCustomerLoggedIn) {
          router.navigate(['/customer/dashboard']); // Redirect to customer dashboard
          return false; // Prevent access to login
        }
  
        return true; // Allow access to login
      }
    ]
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
  {
    path: '', // Empty path
    pathMatch: 'full', // Ensure it matches the empty path only
    redirectTo: '', // No redirection or logic
  },
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
