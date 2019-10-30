import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { FilterService } from '../service/filter.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { Ticket } from '../model/ticket.model';
import { Airport } from '../model/airport.model';
import { FilterRequest } from '../model/filterRequest.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public dialogRef: MatDialogRef<SpinnerComponent>;
  airportList: Array<Airport>;
  ticketList: Array<Ticket>;
  displayedColumns: Array<string>;
  airportFrom: Airport = new Airport();
  airportTo: Airport = new Airport();
  selectFormControl: FormControl;
  picker1: string;
  picker2: string;
  dateFrom: Date;
  dateTo: Date;
  ticketCode: string;
  isRegisteredUser: boolean;
  byTicketCode: boolean;

  constructor(private filterService: FilterService, private dialog: MatDialog) {  };

  ngOnInit() {
    this.createFilter();
    this.createTable();
    this.isRegisteredUser = (!!sessionStorage.getItem('_logged-user'));
    this.byTicketCode = (!sessionStorage.getItem('_logged-user'));
    this.selectFormControl = new FormControl('', Validators.required);
  }

  createFilter() {
    this.airportList = new Array<Airport>();
    JSON.parse(localStorage.getItem('_airports')).forEach(item => {
      this.airportList.push(
          new Airport(item.id, item.code, item.description, item.state, item.state_code, item.address)
      );
    });
  }

  searchTicket() {
    this.showSpinner();
    const user_id = (!this.byTicketCode) ? JSON.parse(sessionStorage.getItem('_logged-user')).id : null;
    const filterRequest = new FilterRequest(user_id, this.dateFrom, this.dateTo, (this.airportFrom) ? this.airportFrom.code : null,
        (this.airportTo) ? this.airportTo.code : null, this.ticketCode);

    if (this.byTicketCode) {
      this.subscription.add( this.filterService.getById('filter/ticket', this.ticketCode).subscribe(
          // @ts-ignore
          value => this.mapperTickets(value.data))
      );
    } else {
      this.subscription.add( this.filterService.getAllPaginatedFiltered('filter/ticketByFilter', filterRequest).subscribe(
          // @ts-ignore
          value => this.mapperTickets(value.data))
      );
    }
  }

  mapperTickets(value) {
    this.ticketList = new Array<Ticket>();
    value.ticketList.forEach(item => {
      this.ticketList.push(
          new Ticket(item.flight_id, item.flight_date, this.filterService.setEndFlight(item.flight_date, item.time), item.airport_code_from,
              item.airport_code_to, item.user_id, item.code, item.correlation_id, item.cancellation_date, item.status, item.payment_way,
              item.payment_way_company, null, null, item.price)
      );
    });
    this.createTable();
    this.hideSpinner();
  }

  createTable() {
    this.displayedColumns = new Array<string>(
        'goingDate', 'airportFrom', 'airportTo', 'takeOfTime', 'arrivalTime', 'price', 'cancel'
    );
  }

  showSpinner() {
    this.dialogRef = this.dialog.open(SpinnerComponent, {
      panelClass: 'dialog-transparent',
      disableClose: true
    });
  }

  hideSpinner() {
    this.dialogRef.close();
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.searchTicket();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: 'dialog-overview.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogOverview implements OnDestroy {
  private subscription: Subscription = new Subscription();
  private readonly isRegisteredUser: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Ticket, public dialogRef: MatDialogRef<DialogOverview>,
              private filterService: FilterService) {
    this.isRegisteredUser = (!!sessionStorage.getItem('_logged-user'));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancelFlight(code) {
    this.subscription.add( this.filterService.update('filter/cancel',
        {code: code, both: false, registered: this.isRegisteredUser}).subscribe(response => this.finishCancel(response))
    );
  }

  cancelByCorrelation(correlation_id) {
    this.subscription.add( this.filterService.update('filter/cancel',
        {code: correlation_id, both: true, registered: this.isRegisteredUser}).subscribe(response => this.finishCancel(response))
    );
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
