import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Airport} from '../model/airport.model';
import {Ticket} from '../model/ticket.model';
// import {FormBuilder} from '../../assets/img/jamaica.jpg';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public slides: [{image: string}, {image: string}, {image: string}, {image: string}, {image: string}];
  isLinear = true;
  // flightList: Array<Flight>;
  airportList: Array<Airport>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {  }

  ngOnInit() {
    // http://www.mysqltutorial.org/mysql-nodejs/call-stored-procedures/
    this.createSlides();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.createFilter();
    // this.createTable();
  }

  createSlides() {
    this.slides = [
      {image: '../../assets/img/miami.jpg'},
      {image: '../../assets/img/brazil.jpg'},
      {image: '../../assets/img/usuahia.jpg'},
      {image: '../../assets/img/friends.jpg'},
      {image: '../../assets/img/brc.jpg'}
    ];
  }

  createFilter() {
    this.airportList = new Array<Airport>(
        new Airport(1, 'AEP', 'aeroparque', 'buenos aires', '', ''),
        new Airport(2, 'EZE', 'ezeiza', 'buenos aires', '', ''),
        new Airport(3, 'BRC', 'san carlos de bariloche', 'río negro', '', ''),
        new Airport(4, 'CTC', 'catamarca', 'catamarca', '', '')
    );
  }
/*
  createTable() {
    this.flightList = new Array<Flight>(
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
  }*/
}
