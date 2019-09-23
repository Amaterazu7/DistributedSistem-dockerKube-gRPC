export class Ticket {
    public id: number;
    public user_id: number;
    public passage_code: string;
    public start_date: string;
    public end_date: string;
    public origin_place: string;
    public destination_place: string;
    public price: number;
    public payment_way: number;
    public payment_way_company: string;

    public constructor(id: number, user_id: number, passage_code: string, start_date: string, end_date: string, origin_place: string,
                       destination_place: string, price: number, payment_way: number, payment_way_company: string) {
        this.id = id;
        this.user_id =  user_id;
        this.passage_code = passage_code;
        this.start_date = start_date;
        this.end_date = end_date;
        this.origin_place = origin_place;
        this.destination_place = destination_place;
        this.price = price;
        this.payment_way = payment_way;
        this.payment_way_company = payment_way_company;
    }
}
