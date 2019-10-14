const uuidv4 = require('uuid/v4');
const configLoader = require('../config/configLoader');
const interceptor = require('../service/interceptor');

module.exports.saveUser = async (res, user) => {
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();

        const user_uuidv4 = uuidv4();
        let buff = (user.registered) ? Buffer.from(user.password) : null;
        let base64data = (user.registered) ? buff.toString('base64') : null;
        let fields = [
            user_uuidv4,
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
            user.registered
        ];
        let query = `CALL create_user(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); `;

        await interceptor.dbRequest(conn, query, fields, `The affectedRows are :::`, false);
        return user_uuidv4;
    } catch (err) {
        interceptor.response(res, 500, 'INSERT FAILED', {}, err);
    } finally {
        conn.end();
    }
};

module.exports.updateUser = async (res, user) => {
    let {id, dni_passport, user_name, password, name, surname, email, phone,
        address, city, country, nationality, about, registered} = user;
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();

        let buff = Buffer.from(password);
        let base64data = (user.change_pass) ? buff.toString('base64') : password;

        let fields = [dni_passport, user_name, base64data, name, surname, email, phone, address,
            city, country, nationality, about, registered, id];

        let query = `CALL update_user(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); `;

        return await interceptor.dbRequest(conn, query, fields, `The affectedRows are :::`, false);
    } catch (err) {
        interceptor.response(res, 500, 'INSERT FAILED', {}, err);
    } finally {
        conn.end();
    }
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

module.exports.getUserMiles = async (res, id) => {
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();

        let field = [ id ];
        let query = `CALL get_miles_by_id(?); `;

        return await interceptor.dbRequest(conn, query, field, `The result count is :::`, true);

    } catch (err) {
        interceptor.response(res, 500, 'SELECT MILES FAILED', {}, err);
    } finally {
        conn.end();
    }
};

module.exports.findAllUsers = (conn, res) => {
    conn.query('SELECT * FROM user ;', undefined, (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.length}`);

        interceptor.response(res, 200, 'SUCCESS', results);
    });
};
