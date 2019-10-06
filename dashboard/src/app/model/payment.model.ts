export class Payment {
    id: number;
    description: string;

    constructor(id: number = null, description: string = null) {
        this.id = id;
        this.description = description;
    }
}

export class CreditCard {
    companyName: string;
    expiration: string;
    number: string;
    code: string;

    constructor(companyName: string = null, expiration: string = null, number: string = null, code: string = null) {
        this.companyName = companyName;
        this.expiration = expiration;
        this.number = number;
        this.code = code;
    }
}
