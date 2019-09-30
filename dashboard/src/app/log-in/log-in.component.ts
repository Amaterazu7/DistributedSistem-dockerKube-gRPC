import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RouterModule, Routes, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from '../model/login.model';
import { UserService } from '../service/user.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public dialogRef: MatDialogRef<SpinnerComponent>;
  public login: Login = new Login();

  constructor(public userService: UserService, private dialog: MatDialog, private router: Router) {  };

  ngOnInit() {  };

  async logUser() {
    console.table(this.login);
    this.showSpinner();
    this.subscription.add( this.userService.validateLogin(this.login).subscribe(value => {
      console.log(value);
      sessionStorage.setItem('_logged-user', JSON.stringify(value.data));
      this.hideSpinner();
    } ) );
  };

  showSpinner() {
    this.dialogRef = this.dialog.open(SpinnerComponent, {
      panelClass: 'dialog-transparent',
      disableClose: true
    });
  }

  async hideSpinner() {
    await this.router.navigate(['/home']);
    location.reload(true);
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
}
