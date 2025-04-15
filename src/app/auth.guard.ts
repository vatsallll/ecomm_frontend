import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Fetch the token from localStorage
    const token = this.getTokenFromLocalStorage();

    if (!token) {
      // Token is missing, redirect to login
      console.log('No token found, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }

    // Validate the token (e.g., check if it's expired)
    if (this.isTokenExpired(token)) {
      console.log('Token expired, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }

    // If token is valid, check the user's role and redirect accordingly
    
    return true;
  }

  // Helper function to get token from localStorage
  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('ecom-token') || null;
  }

  // Helper function to decode JWT and retrieve role


  // Decode JWT token
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }

  // Optional: Check if the token is expired (based on your token structure)
  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken = this.decodeToken(token);
      const expiry = decodedToken.exp; // Assuming 'exp' is the field for expiration time
      if (expiry) {
        const expirationDate = new Date(0); // Time of expiration
        expirationDate.setUTCSeconds(expiry);
        return expirationDate < new Date(); // Compare with current time
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return true; // If no expiration or unable to decode, consider token expired
  }
}
