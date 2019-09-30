import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterService } from '../service/filter.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { Airport } from '../model/airport.model';
import { Flight } from '../model/flight.model';
import { User } from '../model/user.model';
import { Filter } from '../model/filter.model';
import { Ticket } from '../model/ticket.model';
import { CreditCardCompany, Payment, CreditCard } from '../model/payment.model';
// import {FormBuilder} from '../../assets/img/jamaica.jpg';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public dialogRef: MatDialogRef<SpinnerComponent>;
  public slides: [{ image: string }, { image: string }, { image: string }, { image: string }, { image: string }];
  isLinear = true;
  totalAmount = 0;
  goingFlight: Flight = new Flight();
  returnFlight: Flight = new Flight();
  user: User = new User();
  filter: Filter = new Filter();
  creditCard: CreditCard = new CreditCard();
  cabinList: Array<string>;
  displayedStartColumns: Array<string>;
  displayedEndColumns: Array<string>;
  creditCardCompanyList: Array<CreditCardCompany>;
  flightList: Array<Flight>;
  airportList: Array<Airport>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private filterService: FilterService, private _formBuilder: FormBuilder,
              private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.filter.passengers = 1;
    this.createSlides();
    this.firstFormGroup = this._formBuilder.group({
      airportFrom: ['', Validators.required],
      airportTo: ['', Validators.required],
      radioButtonTrip: [],
      picker1: ['', Validators.required],
      picker2: ['', Validators.required],
      cabin: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({secondCtrl: ['']});
    this.createFilter();
    this.setRegisteredUser();
  }

  createSlides() {
    this.slides = [
      {image: '../../assets/img/miami.jpg'},
      {image: '../../assets/img/brazil.jpg'},
      {image: '../../assets/img/usuahia.jpg'},
      {image: '../../assets/img/friends.jpg'},
      {image: '../../assets/img/brc.jpg'}
    ];
    this.creditCardCompanyList = new Array<CreditCardCompany>(
        new CreditCardCompany('VISA'),
        new CreditCardCompany('MasterCard'),
        new CreditCardCompany('American Express')
    );

  }

  createFilter() {
    this.cabinList = new Array<string>('Economy', 'Premium Economy', 'Business', 'Premium Business');
    if (!localStorage.getItem('_airports')) {
      this.createAirport(JSON.parse(localStorage.getItem('_airports')));
    } else {
      this.subscription.add(this.filterService.getAll('filter/airport').subscribe(
          // @ts-ignore
          value => this.createAirport(value.data))
      );
    }
  }

  createAirport(value) {
    this.showSpinner();
    this.airportList = new Array<Airport>();
    value.airportList.forEach(item => {
      this.airportList.push(
          new Airport(item.id, item.code, item.description, item.state, item.state_code, item.address)
      );
    });
    localStorage.setItem('_airports', JSON.stringify(this.airportList));
    this.hideSpinner();
  }

  searchFlights() {
    this.showSpinner();
    this.parserFilter();
    this.subscription.add(this.filterService.save('filter/flight', this.filter).subscribe(
        value => this.createTable(value.data)
    ));
  }

  setRegisteredUser() {
    if (sessionStorage.getItem('_logged-user')) {
      this.user = JSON.parse(sessionStorage.getItem('_logged-user'));
    }
  }

  createTable(value) {
    this.flightList = new Array<Flight>();
    value.flightList.forEach(item => {
      this.flightList.push(
          new Flight(item.id, item.available_economy, item.available_economy_premium, item.available_business,
              item.available_business_premium, item.start_date, item.end_date, this.setEndFlight(item.start_date, item.time),
              this.setEndFlight(item.end_date, item.time), item.price)
      );
    });
    console.log(this.flightList);
    this.displayedStartColumns = new Array<string>('startDate', 'takeOfTime', 'arrivalTime', 'price', 'edit');
    this.displayedEndColumns = new Array<string>('endDate', 'takeOfTime', 'arrivalTime', 'price', 'edit');
    this.hideSpinner();
  }

  public plusPassengers() {
    if (this.filter.passengers < 10) {
      this.filter.passengers += 1;
    } else { this.filter.passengers = 10; }
  }

  public minusPassengers() {
    if (this.filter.passengers > 1) {
    this.filter.passengers -= 1;
    } else { this.filter.passengers = 1; }
  }

  public changeModel() { this.filter.payWithMiles = !this.filter.payWithMiles; }

  public selectGoing(flight: Flight) {
    this.goingFlight = flight;
  }

  public selectReturn(flight: Flight) {
    this.returnFlight = flight;
  }

  public lastStep() {
    this.totalAmount = this.goingFlight.price + this.returnFlight.price;
  }
  private generateTicket() {
    // const ticket = new Ticket();
  }

  private setEndFlight(date: Date, time) {
    let endFlight = new Date(date);
    const minutes = Number(time.toString().substring(2, 4));
    endFlight = new Date(endFlight.setHours(endFlight.getHours() + time, endFlight.getMinutes() + minutes));
    return endFlight.toISOString();
  }

  private parserFilter() {
    this.filter.airportFrom = this.firstFormGroup.value.airportFrom;
    this.filter.airportTo = this.firstFormGroup.value.airportTo;
    this.filter.date_from = this.firstFormGroup.value.picker1;
    this.filter.date_to = this.firstFormGroup.value.picker2;
    this.filter.selectedCabin = this.firstFormGroup.value.cabin;
    if (this.firstFormGroup.value.radioButtonTrip && this.firstFormGroup.value.radioButtonTrip === 2) {
      this.filter.roundTrip = false;
      this.filter.oneWay = true;
    } else {
      this.filter.roundTrip = true;
      this.filter.oneWay = false;
    }
  }

  private showSpinner() {
    this.dialogRef = this.dialog.open(SpinnerComponent, {
      panelClass: 'dialog-transparent',
      disableClose: true
    });
  }

  private hideSpinner() {
    this.dialogRef.close();
  }
}
