export class Flight {
    id: string;
    available_economy: number;
    available_economy_premium: number;
    available_business: number;
    available_business_premium: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    price: number;

    constructor(id: string = null, available_economy: number = null, available_economy_premium: number = null,
                available_business: number = null, available_business_premium: number = null, start_date: string = null,
                end_date: string = null, start_time: string = null, end_time: string = null, price: number = null) {
        this.id = id;
        this.available_economy = available_economy;
        this.available_economy_premium =  available_economy_premium;
        this.available_business = available_business;
        this.available_business_premium = available_business_premium;
        this.start_date = start_date;
        this.end_date = end_date;
        this.start_time = start_time;
        this.end_time = end_time;
        this.price = price;
    }
}
