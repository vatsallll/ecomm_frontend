import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserStorageService } from './services/storage/user-storage.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
//   title = 'ShopZilla';
  

//   isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
//   isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
//   mobileMenuOpen: boolean = false;
//   isMenuOpen: boolean = false;
// showLandingPage: any;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     this.router.events.subscribe((event) => {
//       this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
//       this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
//     });
//   }
//   logout() {
//     UserStorageService.signOut();

//     this.router.navigateByUrl('login');
//   }

//   toggleMenu(): void {
//     this.isMenuOpen = !this.isMenuOpen; // Toggle menu state
//   }

title = 'ShopZilla';

isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
mobileMenuOpen: boolean = false;
isMenuOpen: boolean = false;
showLandingPage: boolean = false;

constructor(private router: Router) {}

ngOnInit(): void {
  // Update login states when route changes
  this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      this.showLandingPage = event.urlAfterRedirects === '/';
    });
}

logout() {
  UserStorageService.signOut();
  this.router.navigateByUrl('login');
}

toggleMenu(): void {
  this.isMenuOpen = !this.isMenuOpen;
}
}