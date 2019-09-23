const uuidv4 = require('uuid/v4');
const interceptor = require('../service/interceptor');

module.exports.saveUser = async (conn, res, user) => {
    let buff = Buffer.from(user.password);
    let base64data = buff.toString('base64');
    let fields = [
        uuidv4(),
        user.dni_passport,
        user.user_name,
        base64data,
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
    let query = `INSERT INTO user (id, dni_passport, user_name, password, name, surname, email, phone, address, city, 
                           country, nationality, about, miles, registered) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;`;

    let results = await interceptor.dbRequest(conn, query, fields, `The affectedRows are :::`, false);
    interceptor.response(res, 200, 'SUCCESS', results);
};

module.exports.updateUser = (conn, res, user) => {
    let {id, dni_passport, user_name, password, name, surname, email, phone,
        address, city, country, nationality, about, miles, registered} = user;
    let buff = Buffer.from(password);
    let base64data = (user.change_pass) ? buff.toString('base64') : password;
    let fields = [dni_passport, user_name, base64data, name, surname, email, phone, address,
        city, country, nationality, about, miles, registered, id];

    conn.query(`UPDATE user SET dni_passport = ?, user_name = ?, password = ?, name = ?, surname = ?, email = ?, phone = ?, address = ?,
    city = ?, country = ?, nationality = ?, about = ?, miles = ?, registered = ? WHERE id = ? ;`, fields, (error, results) => {
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
