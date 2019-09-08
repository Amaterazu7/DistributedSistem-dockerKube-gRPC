const interceptor = require('../service/interceptor');

module.exports.saveUser = (conn, res, user) => {
    let fields = [
        user.id,
        user.name,
        user.surname,
        user.dni_passport,
        user.nationality,
        user.address,
        user.phone,
        user.email,
        user.registered,
        user.miles,
        user.password
    ];
    conn.query(
        `INSERT INTO user (id, name, surname, dni_passport, nationality, address, phone, email, registered, miles, password) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;`, fields, (error, results) => {
            if (error) throw error;
            console.log(`The affectedRows are ::: ${results.affectedRows}`);

            interceptor.response(res, 200, 'SUCCESS', results);
        });
};

module.exports.updateUser = (conn, res, body) => {
    let {name, surname, dni_passport, nationality, address, phone, email,registered, miles, password, id} = body;
    let fields = [name, surname, dni_passport, nationality, address, phone, email,registered, miles, password, id];
    conn.query(`UPDATE user SET name = ?, surname = ?, dni_passport = ?, nationality = ?, address = ?, phone = ?,
     email = ?, registered = ?, miles = ?, password = ? WHERE id = ? ;`, fields, (error, results) => {
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
