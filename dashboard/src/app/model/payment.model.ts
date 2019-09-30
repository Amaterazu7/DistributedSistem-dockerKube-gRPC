export class Payment {
    id: number;
    description: string;

    constructor(id: number = null, description: string = null) {
        this.id = id;
        this.description = description;
    }
}

export class CreditCard {
    expiration: string;
    number: string;
    code: string;

    constructor(expiration: string = null, number: string = null, code: string = null) {
        this.expiration = expiration;
        this.number = number;
        this.code = code;
    }
}

export class CreditCardCompany {
    companyName: string;

    constructor(companyName: string = null) {
        this.companyName = companyName;
    }
}
