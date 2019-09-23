import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TicketListComponent } from '../../ticket-list/ticket-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { LogInComponent } from '../../log-in/log-in.component';
import { SignInComponent } from '../../sign-in/sign-in.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home',      component: HomeComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'ticket-list',     component: TicketListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'log-in',        component: LogInComponent },
    { path: 'sign-in',        component: SignInComponent }
    /*
        {
            path: '',
            children: [{
                path: 'dashboard',
                component: DashboardComponent
            }]
        },
        {
            path: '',
            children: [{
                path: 'userprofile',
                component: UserProfileComponent
            }]
        },
        {
            path: '',
            children: [{
                path: 'icons',
                component: IconsComponent
            }]
        },
        {
             path: '',
             children: [{
                 path: 'notifications',
                 component: NotificationsComponent
            }]
        },
        {
             path: '',
             children: [{
                 path: 'maps',
                 component: MapsComponent
            }]
        },
        {
             path: '',
             children: [{
                 path: 'typography',
                 component: TypographyComponent
             }]
         },
         {
             path: '',
             children: [{
                 path: 'sign-in',
                 component: SignInComponent
             }]
        }
    */
];
