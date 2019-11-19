import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RouterModule, Routes, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from '../model/login.model';
import { UserService } from '../service/user.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    this.showSpinner();
    this.subscription.add( this.userService.validateLogin(this.login).subscribe(value => {
      if (value.error && value.error === 404) {
        console.log(value.data.message);
        this.openDialog(value.data.message);
      } else {
        sessionStorage.setItem('_logged-user', JSON.stringify(value.data));
        this.goHome();
      }
      this.hideSpinner();
    } ) );
  };

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogLogin, {
      width: '700px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  showSpinner() {
    this.dialogRef = this.dialog.open(SpinnerComponent, {
      panelClass: 'dialog-transparent',
      disableClose: true
    });
  }

  async goHome() {
    await this.router.navigate(['/home']);
    location.reload(true);
  }

  hideSpinner() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
}

@Component({
  selector: 'app-dialog-login',
  templateUrl: 'dialog-login.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogLogin implements OnDestroy {
  private subscription: Subscription = new Subscription();
  private readonly isRegisteredUser: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef: MatDialogRef<DialogLogin>) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  finishCancel(response) {
    if (response.status === 'SUCCESS') {
      this.onNoClick();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
