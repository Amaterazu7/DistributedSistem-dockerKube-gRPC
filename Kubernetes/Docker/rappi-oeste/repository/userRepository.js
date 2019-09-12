const interceptor = require('../service/interceptor');

module.exports.saveUser = (conn, res, user) => {
    let fields = [
        user.id,
        user.dni_passport,
        user.user_name,
        user.password,
        user.name,
        user.surname,
        user.email,
        user.phone,
        user.address,
        user.city,
        user.country,
        user.nationality,
        user.about,
        user.miles,
        user.registered
    ];
    conn.query(
        `INSERT INTO user (id, dni_passport, user_name, password, name, surname, email, phone, address, city, 
                           country, nationality, about, miles, registered) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;`, fields, (error, results) => {
            if (error) throw error;
            console.log(`The affectedRows are ::: ${results.affectedRows}`);

            interceptor.response(res, 200, 'SUCCESS', results);
        });
};

module.exports.updateUser = (conn, res, user) => {
    let {id, dni_passport, user_name, password, name, surname, email, phone,
        address, city, country, nationality, about, miles, registered, root} = user;
    let fields = [id, dni_passport, user_name, password, name, surname, email, phone,
        address, city, country, nationality, about, miles, registered, root];

    conn.query(`UPDATE user SET dni_passport = ?, user_name = ?, password = ?, name = ?, surname = ?, email = ?, phone = ?, address = ?,
    city = ?, country = ?, nationality = ?, about = ?, miles = ?, registered = ?, root = ? WHERE id = ? ;`, fields, (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.affectedRows}`);

        interceptor.response(res, 200, 'SUCCESS', results);
    });
};

module.exports.deleteUser = (conn, res, id) => {
    conn.query(`DELETE FROM user WHERE id = ? ;`, parseInt(id), (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.affectedRows}`);

        interceptor.response(res, 200, 'SUCCESS', results);
    });
};

module.exports.getUser = (conn, res, id) => {
    conn.query(`SELECT * FROM user WHERE id = ?`, id, (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.length}`);

        interceptor.response(res, 200, 'SUCCESS', results[0]);
    });
};

module.exports.findAllUsers = (conn, res) => {
    conn.query('SELECT * FROM user ;', undefined, (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.length}`);

        interceptor.response(res, 200, 'SUCCESS', results);
    });
};
