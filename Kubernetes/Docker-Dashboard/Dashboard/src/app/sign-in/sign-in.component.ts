import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RouterModule, Routes, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public dialogRef: MatDialogRef<SpinnerComponent>;
  public user: User = new User();

  constructor(public userService: UserService, private dialog: MatDialog, private router: Router) { };

  ngOnInit() {  };

  createUser() {
    console.table(this.user);
    this.showSpinner();
    this.subscription.add( this.userService.saveUser(this.user).subscribe(
        async value => this.hideSpinner()
    ));
  };

  showSpinner() {
    this.dialogRef = this.dialog.open(SpinnerComponent, {
      panelClass: 'dialog-transparent',
      disableClose: true
    });
  }

  async hideSpinner() {
    await this.router.navigate(['/log-in']);
    location.reload(true);
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
}
