export class Login {
    user_name: string;
    password: string;

    constructor(user_name: string = null, password: string = null) {
        this.user_name = user_name;
        this.password = password;
    }
}
