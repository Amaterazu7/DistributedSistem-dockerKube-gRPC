import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public user: User;

  constructor(public userService: UserService) { };

  ngOnInit() {
    this.user = new User
    (5, null, null, null, null, null, null, null, null,
        null, null, null, null, null, true, false);
  };

  createUser() {
    console.table(this.user);
    this.subscription.add( this.userService.saveUser(this.user).subscribe(value => console.log(value)) );
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
}
