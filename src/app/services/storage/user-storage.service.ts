import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor() {}

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
    // try {
    //   console.log('🔹 Removing old token...');
    //   window.localStorage.removeItem(TOKEN);

    //   console.log('✅ Saving new token:', token);
    //   window.localStorage.setItem(TOKEN, token);
    // } catch (e) {
    //   console.error('❌ Error saving token:', e);
    // }
  }

  public saveUser(user): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
    // try {
    //   console.log('🔹 Removing old user...');
    //   window.localStorage.removeItem(USER);

    //   console.log('✅ Saving new user:', user);
    //   window.localStorage.setItem(USER, JSON.stringify(user));
    // } catch (e) {
    //   console.error('❌ Error saving user:', e);
    // }
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  // STATIC SHOULD BE THERE

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.userId;
  }

  // HERE ALSO NO STATIC

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CUSTOMER';
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
