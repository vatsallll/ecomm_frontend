import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';


@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = UserStorageService.getToken();
    if (!token || UserStorageService.isTokenExpired(token)) {
      // Redirect to login if token is invalid or expired
      this.router.navigate(['/login']);
      return false;
    }

    const role = UserStorageService.getUserRole();
    if (role !== 'ADMIN') {
      // Redirect to a "not authorized" page or login if role is not admin
      this.router.navigate(['/not-authorized']);
      return false;
    }

    return true;
  }
}
