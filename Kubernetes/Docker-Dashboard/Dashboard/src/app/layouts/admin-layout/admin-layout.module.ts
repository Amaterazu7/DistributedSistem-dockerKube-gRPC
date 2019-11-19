import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { HomeComponent, SafePipe, DialogSuccess } from '../../home/home.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TicketListComponent, DialogOverview } from '../../ticket-list/ticket-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { LogInComponent, DialogLogin } from '../../log-in/log-in.component';
import { SignInComponent } from '../../sign-in/sign-in.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatTableModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatStepperModule,
        MatCarouselModule,
        MatCheckboxModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatIconModule,
        MatDividerModule,
        MatToolbarModule
    ],
    providers: [
        MatDatepickerModule,
        MatCarouselModule,
        MatTableModule
    ],
    entryComponents: [SpinnerComponent, DialogOverview, DialogLogin, DialogSuccess],
    declarations: [
        HomeComponent,
        DashboardComponent,
        UserProfileComponent,
        TicketListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        LogInComponent,
        SignInComponent,
        DialogOverview,
        DialogLogin,
        DialogSuccess,
        SpinnerComponent,
        SafePipe
    ]
})

export class AdminLayoutModule {}
