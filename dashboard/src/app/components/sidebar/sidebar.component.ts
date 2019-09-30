import { Component, OnInit } from '@angular/core';


export const validateSession = () => {
    const validator = (sessionStorage.getItem('_logged-user')) ? true : false;
    return (validator);
};

export const adminSession = () => {
    const isAdmin = true;
    return (isAdmin);
};

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Home',  icon: 'home', class: '' },
    (validateSession() && adminSession()) ? { path: '/dashboard', title: 'Admin Dashboard',  icon: 'dashboard', class: '' } : null,
    (validateSession()) ? { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' } : null,
    (validateSession()) ? { path: '/ticket-list', title: 'Ticket List',  icon: 'content_paste', class: '' } : null,
    (validateSession()) ? null : { path: '/log-in', title: 'LogIn',  icon: 'fingerprint', class: 'log-in' },
    (validateSession()) ? null : { path: '/sign-in', title: 'Sign In',  icon: 'account_circle', class: 'sign-in' }
];
/*
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Home',  icon: 'home', class: '' },
    { path: '/dashboard', title: 'Admin Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
    { path: '/ticket-list', title: 'Ticket List',  icon: 'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon: 'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon: 'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    { path: '/log-in', title: 'LogIn',  icon: 'fingerprint', class: 'log-in' },
    { path: '/sign-in', title: 'Sign In',  icon: 'account_circle', class: 'sign-in' }
];
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
