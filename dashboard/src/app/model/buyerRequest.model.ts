import { User } from './user.model';
import { CreditCard, Payment } from './payment.model';

export class BuyerRequest {
    user: User;
    flightList: Array<string>;
    payment: Payment;
    creditCard: CreditCard;
    payWithMiles: boolean;

    constructor(user: User, flightList: Array<string>, payment: Payment, creditCard: CreditCard = null, payWithMiles: boolean = false) {
        this.user = user;
        this.flightList = flightList;
        this.payment = payment;
        this.creditCard = creditCard;
        this.payWithMiles = payWithMiles;
    }
}
