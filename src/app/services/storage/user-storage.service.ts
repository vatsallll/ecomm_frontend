import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor() {}

  public saveToken(token: string): void {
    // window.localStorage.removeItem(TOKEN);
    // window.localStorage.setItem(TOKEN, token);
    try {
      console.log('🔹 Removing old token...');
      window.localStorage.removeItem(TOKEN);

      console.log('✅ Saving new token:', token);
      window.localStorage.setItem(TOKEN, token);
    } catch (e) {
      console.error('❌ Error saving token:', e);
    }
  }

  public saveUser(user: string): void {
    // window.localStorage.removeItem(USER);
    // window.localStorage.setItem(TOKEN, JSON.stringify(user));
    try {
      console.log('🔹 Removing old user...');
      window.localStorage.removeItem(USER);

      console.log('✅ Saving new user:', user);
      window.localStorage.setItem(USER, JSON.stringify(user));
    } catch (e) {
      console.error('❌ Error saving user:', e);
    }
  }

  
}
