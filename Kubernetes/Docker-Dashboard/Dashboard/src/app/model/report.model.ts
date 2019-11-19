export class Report {
    origin: string;
    destination: string;
    cancelled: any;
    refund: number;

    constructor(origin: string = null, destination: string = null, cancelled: any = null, refund: number = null) {
        this.origin = origin;
        this.destination = destination;
        this.cancelled = cancelled;
        this.refund = refund;
    }
}
