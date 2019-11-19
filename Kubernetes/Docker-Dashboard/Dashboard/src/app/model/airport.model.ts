export class Airport {
    public id: number;
    public code: string;
    public description: string;
    public state: string;
    public state_code: string;
    public address: string;
    public show_airport: boolean;

    public constructor(id: number = null, code: string = null, description: string = null, state: string = null, state_code: string = null,
                       address: string = null, show_airport: boolean = null) {
        this.id = id;
        this.code =  code;
        this.description = description;
        this.state = state;
        this.state_code = state_code;
        this.address = address;
        this.show_airport = show_airport;
    }
}
