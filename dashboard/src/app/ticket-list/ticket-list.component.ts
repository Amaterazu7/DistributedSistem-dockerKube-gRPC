import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { FilterService } from '../service/filter.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { Ticket } from '../model/ticket.model';
import { Airport } from '../model/airport.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public dialogRef: MatDialogRef<SpinnerComponent>;
  ticketList: Array<Ticket>;
  airportList: Array<Airport>;
  displayedColumns: Array<string>;
  selectFormControl: FormControl;
  picker1: string;
  picker2: string;
  airportFrom: Airport;
  airportTo: Airport;

  constructor(private filterService: FilterService, private dialog: MatDialog) {  };

  ngOnInit() {
    this.createFilter();
    this.createTable();
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
    const user_id = JSON.parse(sessionStorage.getItem('_logged-user')).id;
    this.subscription.add( this.filterService.getById('filter/ticket', user_id).subscribe(
        // @ts-ignore
        value => this.mapperTickets(value.data))
    );
  }

  mapperTickets(value) {
    this.ticketList = new Array<Ticket>();
    value.ticketList.forEach(item => {
      this.ticketList.push(
        new Ticket(item.id, item.user_id, item.passage_code, item.start_date, item.end_date, item.origin_place, item.destination_place,
        item.price, item.payment_way, item.payment_way_company)
      );
    });
    this.createTable();
    this.hideSpinner();
  }

  createTable() {
    this.displayedColumns = new Array<string>(
        'ticketCode', 'startDate', 'endDate', 'origin', 'destination', 'payment', 'price', 'cancel'
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
}
