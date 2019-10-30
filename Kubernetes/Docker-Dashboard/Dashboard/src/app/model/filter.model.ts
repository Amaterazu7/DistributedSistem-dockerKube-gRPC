import {Airport} from './airport.model';

export class Filter {
    date_from: Date;
    date_to: Date;
    airportFrom: Airport;
    airportTo: Airport;
    roundTrip: boolean;
    oneWay: boolean;
    ticket_code: string;
    payWithMiles: boolean;
    passengers: number;
    selectedCabin: string;

    constructor(date_from: Date = null, date_to: Date = null, airportFrom: Airport = null, airportTo: Airport = null,
                roundTrip: boolean = true, oneWay: boolean = false, ticket_code: string = null, payWithMiles: boolean = false,
                passengers: number = null, selectedCabin: string = null) {
        this.date_from = date_from;
        this.date_to = date_to;
        this.airportFrom = airportFrom;
        this.airportTo = airportTo;
        this.roundTrip = roundTrip;
        this.oneWay = oneWay;
        this.ticket_code = ticket_code;
        this.payWithMiles = payWithMiles;
        this.passengers = passengers;
        this.selectedCabin = selectedCabin;
    }
}
