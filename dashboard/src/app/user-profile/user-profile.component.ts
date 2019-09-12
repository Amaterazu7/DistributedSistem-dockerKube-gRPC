import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {register} from 'ts-node';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public user: User;
  private controllerName = 'user';

  constructor(public userService: UserService) { };

  ngOnInit() {
    // this.subscription.add( this.userService.getById('user', this.user.id).subscribe(value => this.mapperUser(value)) );
    this.subscription.add( this.userService.getById(this.controllerName, 2).subscribe(value => this.mapperUser(value.data)) );
  };

  mapperUser(user: User) {
    this.user = new User
    (user.id, user.name, user.surname, user.user_name, user.password, user.dni_passport, user.nationality, user.address, user.phone,
        user.email, user.city, user.country, user.about, user.miles, user.registered, user.root);
  };

  updateUser() {
    console.table(this.user);
    this.subscription.add( this.userService.update(this.controllerName, this.user).subscribe(value => console.log(value)) );
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };

}
