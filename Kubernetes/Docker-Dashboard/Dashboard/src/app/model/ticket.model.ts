export class Ticket {
     flight_id: string;
     flight_date: string;
     end_time: string;
     airport_code_from: string;
     airport_code_to: string;
     user_id: number;
     code: string;
     correlation_id: string;
     cancellation_date: string;
     status: string;
     payment_way: number;
     payment_way_company: string;
     creation_date: string;
     refund: string;
     price: string;

     constructor(flight_id: string = null, flight_date: string = null, end_time: string = null, airport_code_from: string = null,
                 airport_code_to: string = null, user_id: number = null, code: string = null, correlation_id: string = null,
                 cancellation_date: string = null, status: string = null, payment_way: number = null, payment_way_company: string = null,
                 creation_date: string = null, refund: string = null, price: string = null) {
        this.flight_id = flight_id;
        this.flight_date = flight_date;
        this.end_time = end_time;
        this.airport_code_from = airport_code_from;
        this.airport_code_to = airport_code_to;
        this.user_id =  user_id;
        this.code = code;
        this.correlation_id = correlation_id;
        this.cancellation_date = cancellation_date;
        this.status = status;
        this.payment_way = payment_way;
        this.payment_way_company = payment_way_company;
        this.creation_date = creation_date;
        this.refund = refund;
        this.price = price;
    }
}
