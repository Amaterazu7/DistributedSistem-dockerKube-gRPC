import { User } from './user.model';
import { CreditCard, Payment } from './payment.model';

export class BuyerRequest {
    user: User;
    flightList: Array<string>;
    payment: Payment;
    creditCard: CreditCard;

    constructor(user: User, flightList: Array<string>, payment: Payment, creditCard: CreditCard = null) {
        this.user = user;
        this.flightList = flightList;
        this.payment = payment;
        this.creditCard = creditCard;
    }
}
