import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {Subscription} from 'rxjs';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public dialogRef: MatDialogRef<SpinnerComponent>;
  public user: User;
  public id: string;
  private controllerName = 'user';

  constructor(public userService: UserService, private dialog: MatDialog) {  };

  ngOnInit() {
    this.mapperUser(JSON.parse(sessionStorage.getItem('_logged-user')));
    this.subscription.add();
  };

  mapperUser(user: User) {
    this.user = new User(user.id, user.name, user.surname, user.user_name, user.password, user.dni_passport, user.nationality,
        user.address, user.phone, user.email, user.city, user.country, user.about, user.miles, user.registered, user.change_pass);
  };

  updateUser() {
    console.table(this.user);
    this.showSpinner();
    this.subscription.add( this.userService.update(this.controllerName, this.user).subscribe(value => this.hideSpinner(value)) );
  };

  showSpinner() {
    this.dialogRef = this.dialog.open(SpinnerComponent, {
      panelClass: 'dialog-transparent',
      disableClose: true
    });
  }

  hideSpinner(value) {
    console.log(value);
    sessionStorage.setItem('_logged-user', JSON.stringify(this.user));
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };

}
