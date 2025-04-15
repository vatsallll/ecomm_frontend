import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeusernameComponent } from '../changeusername/changeusername.component';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  //dialog: any;

  constructor(private customerService: CustomerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.customerService.getUserProfile().subscribe((res) => {
      this.user = res;
      
      console.log(this.user);
    });
    
    
  }

  ChangeUsername(): void {
    const dialogRef = this.dialog.open(ChangeusernameComponent, {
      width: '400px',
      data: { currentUsername: this.user?.username }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);  // Verify the result
      if (result) {
        this.user.username = result;
        console.log('Updated username:', result);
        this.customerService.ChangeUsername(result).subscribe(
          response => {
            console.log('Backend response:', response);
            this.getUserProfile();
          },
          error => {
            console.error('Error occurred:', error);
          }
        );
      }
      
    });
  }
  
  ChangePassword(): void {
    const dialogRef = this.dialog.open(ChangepasswordComponent, {
      width: '400px',
      data: { currentUsername: this.user?.username }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.user.username = result;
        console.log('Updated username:', result);
        // Call a service to save the updated username, if necessary
      }
    });
    
  }

  logout(): void {
    console.log('Logout button clicked');
    // Implement logout logic here
  }
}
