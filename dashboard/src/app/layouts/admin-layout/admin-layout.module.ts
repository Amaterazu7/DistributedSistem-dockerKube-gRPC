import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
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
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule
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
        MatProgressSpinnerModule
    ],
    providers: [
        MatDatepickerModule,
        MatCarouselModule,
        MatTableModule
    ],
    entryComponents: [SpinnerComponent],
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
        SpinnerComponent
    ]
})

export class AdminLayoutModule {}
