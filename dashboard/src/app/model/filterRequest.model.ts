
export class FilterRequest {
    user_id: string;
    date_start: Date;
    date_end: Date;
    airport_from: string;
    airport_to: string;
    code: string;

    constructor(user_id: string, date_start: Date = null, date_end: Date = null, airport_from: string = null, airport_to: string = null,
                code: string = null) {
        this.user_id = user_id;
        this.date_start = date_start;
        this.date_end = date_end;
        this.airport_from = airport_from;
        this.airport_to = airport_to;
        this.code = code;
    }
}
