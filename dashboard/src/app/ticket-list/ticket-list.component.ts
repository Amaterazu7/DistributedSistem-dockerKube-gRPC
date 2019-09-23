import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Ticket } from '../model/ticket.model';
import {Airport} from '../model/airport.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  picker1: string;
  picker2: string;
  ticketList: Array<Ticket>;
  airportList: Array<Airport>;
  airportFrom: Airport;
  airportTo: Airport;
  displayedColumns: Array<string>;
  selectFormControl: FormControl;

  constructor() { }

  ngOnInit() {
    this.createFilter();
    this.createTable();
    this.selectFormControl = new FormControl('', Validators.required);
  }

  createFilter() {
    this.airportList = new Array<Airport>(
        new Airport(1, 'AEP', 'aeroparque', 'buenos aires', '', ''),
        new Airport(2, 'EZE', 'ezeiza', 'buenos aires', '', ''),
        new Airport(3, 'BRC', 'san carlos de bariloche', 'río negro', '', ''),
        new Airport(4, 'CTC', 'catamarca', 'catamarca', '', '')
    );
  }


  searchTicket() {
    console.log('Show :: ==> ');
  }

  createTable() {
    this.ticketList = new Array<Ticket>(
        new Ticket(1, 2, '6e7560de-6032-447d-8ca7-271237941065', '2019-09-15', '2019-10-15',
            'Buenos Aires', 'Mendoza', 700, 1, 'VISA'),
        new Ticket(1, 2, '6e7560de-6032-447d-8ca7-271237941065', '2019-09-15', '2019-10-15',
            'Buenos Aires', 'Mendoza', 1500, 1, 'VISA'),
        new Ticket(1, 2, '6e7560de-6032-447d-8ca7-271237941065', '2019-09-15', '2019-10-15',
            'Buenos Aires', 'Mendoza', 800, 1, 'MasterCard'),
        new Ticket(1, 2, '6e7560de-6032-447d-8ca7-271237941065', '2019-09-15', '2019-10-15',
            'Buenos Aires', 'Mendoza', 1200, 1, 'VISA'),
        new Ticket(1, 2, '6e7560de-6032-447d-8ca7-271237941065', '2019-09-15', '2019-10-15',
            'Buenos Aires', 'Mendoza', 2000, 1, 'AmericanExpress'),
        new Ticket(1, 2, '6e7560de-6032-447d-8ca7-271237941065', '2019-09-15', '2019-10-15',
            'Buenos Aires', 'Mendoza', 100, 1, 'VISA')
    );
    this.displayedColumns = new Array<string>(
        'ticketCode', 'startDate', 'endDate', 'origin', 'destination', 'payment', 'price', 'cancel'
    );
  }
}
