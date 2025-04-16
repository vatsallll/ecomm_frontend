// import { Injectable } from '@angular/core';

// const TOKEN = 'ecom-token';
// const USER = 'ecom-user';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserStorageService {
//   constructor() {}

//   public saveToken(token: string): void {
//     window.localStorage.removeItem(TOKEN);
//     window.localStorage.setItem(TOKEN, token);
//     // try {
//     //   console.log('🔹 Removing old token...');
//     //   window.localStorage.removeItem(TOKEN);

//     //   console.log('✅ Saving new token:', token);
//     //   window.localStorage.setItem(TOKEN, token);
//     // } catch (e) {
//     //   console.error('❌ Error saving token:', e);
//     // }
//   }

//   public saveUser(user): void {
//     window.localStorage.removeItem(USER);
//     window.localStorage.setItem(USER, JSON.stringify(user));
//     // try {
//     //   console.log('🔹 Removing old user...');
//     //   window.localStorage.removeItem(USER);

//     //   console.log('✅ Saving new user:', user);
//     //   window.localStorage.setItem(USER, JSON.stringify(user));
//     // } catch (e) {
//     //   console.error('❌ Error saving user:', e);
//     // }
//   }

//   static getToken(): string {
//     return localStorage.getItem(TOKEN);
//   }

//   // STATIC SHOULD BE THERE

//   static getUser(): any {
//     return JSON.parse(localStorage.getItem(USER));
//   }

//   static getUserId(): string {
//     const user = this.getUser();
//     if (user == null) {
//       return '';
//     }
//     return user.userId;
//   }

//   // HERE ALSO NO STATIC

//   static getUserRole(): string {
//     const user = this.getUser();
//     if (user == null) {
//       return '';
//     }
//     return user.role;
//   }

//   static isAdminLoggedIn(): boolean {
//     if (this.getToken() === null || this.isTokenExpired(TOKEN)) {
//       return false;
//     }
//     const role: string = this.getUserRole();
//     return role == 'ADMIN';
//   }

//   static isCustomerLoggedIn(): boolean {
//     if (this.getToken() === null || this.isTokenExpired(TOKEN)) {
//       return false;
//     }
//     const role: string = this.getUserRole();
//     return role == 'CUSTOMER';
//   }

//   static signOut(): void {
//     window.localStorage.removeItem(TOKEN);
//     window.localStorage.removeItem(USER);
//   }

//   static isTokenExpired(token: string): boolean {
//     try {
//       const decodedToken = this.decodeToken(token);
//       const expiry = decodedToken.exp; // Assuming 'exp' is the field for expiration time
//       if (expiry) {
//         const expirationDate = new Date(0); // Time of expiration
//         expirationDate.setUTCSeconds(expiry);
//         return expirationDate < new Date(); // Compare with current time
//       }
//     } catch (error) {
//       console.error('Error decoding token:', error);
//     }
//     return true; // If no expiration or unable to decode, consider token expired
//   }

//   static decodeToken(token: string): any {
//     try {
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split('')
//           .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//           .join('')
//       );
//       return JSON.parse(jsonPayload);
//     } catch (error) {
//       throw new Error('Invalid token format');
//     }
//   }
// }

import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor() {}

  // Save Token to Local Storage
  public saveToken(token: string): void {
    try {
      localStorage.setItem(TOKEN, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  // Save User Information to Local Storage
  public saveUser(user: any): void {
    try {
      localStorage.setItem(USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  // Get Token from Local Storage
  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  // Get User Information from Local Storage
  static getUser(): any | null {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  // Get User ID from User Object
  static getUserId(): string {
    const user = this.getUser();
    return user?.userId || '';
  }

  // Get User Role from User Object
  static getUserRole(): string {
    const user = this.getUser();
    return user?.role || '';
  }

  // Check if Admin is Logged In
  static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token) && this.getUserRole() === 'ADMIN';
  }

  // Check if Customer is Logged In
  static isCustomerLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token) && this.getUserRole() === 'CUSTOMER';
  }

  // Sign Out the User (Clear Storage)
  static signOut(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  }

  // Check if Token is Expired
  static isTokenExpired(token: string): boolean {
    try {
      const decodedToken = this.decodeToken(token);
      const expiry = decodedToken.exp; // 'exp' is assumed to be in seconds
      if (expiry) {
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(expiry);
        return expirationDate < new Date();
      }
    } catch (error) {
      console.error('Error checking token expiration:', error);
    }
    return true; // Consider expired if there's an issue
  }

  // Decode JWT Token
  static decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = atob(base64);
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      throw new Error('Invalid token format');
    }
  }
}

