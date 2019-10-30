export class User {
    id: number;
    name: string;
    surname: string;
    user_name: string;
    password: string;
    dni_passport: string;
    nationality: string;
    address: string;
    phone: string;
    email: string;
    city: string;
    country: string;
    about: string;
    miles: number;
    registered: boolean;
    change_pass: boolean;

    constructor(id: number = null, name: string = null, surname: string = null, user_name: string = null, password: string = null,
                dni_passport: string = null, nationality: string = null, address: string = null, phone: string = null,
                email: string = null, city: string = null, country: string = null, about: string = null, miles: number = null,
                registered: boolean = false, change_pass: boolean = false) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.user_name = user_name;
        this.password = password;
        this.dni_passport = dni_passport;
        this.nationality = nationality;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.city = city;
        this.country = country;
        this.about = about;
        this.miles = miles;
        this.registered = registered;
        this.change_pass =  change_pass;
    }
}
