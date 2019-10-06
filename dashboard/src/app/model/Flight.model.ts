export class Flight {
    id: string;
    airport_code_from: string;
    airport_code_to: string;
    available_economy: number;
    available_economy_premium: number;
    available_business: number;
    available_business_premium: number;
    flight_date: string;
    end_time: string;
    price: number;

    constructor(id: string = null, airport_code_from: string = null, airport_code_to: string = null, available_economy: number = null,
                available_economy_premium: number = null, available_business: number = null, available_business_premium: number = null,
                flight_date: string = null, end_time: string = null, price: number = null) {
        this.id = id;
        this.airport_code_from = airport_code_from;
        this.airport_code_to = airport_code_to;
        this.available_economy = available_economy;
        this.available_economy_premium =  available_economy_premium;
        this.available_business = available_business;
        this.available_business_premium = available_business_premium;
        this.flight_date = flight_date;
        this.end_time = end_time;
        this.price = price;
    }
}
