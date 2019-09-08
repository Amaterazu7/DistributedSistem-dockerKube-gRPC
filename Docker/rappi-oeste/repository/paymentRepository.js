const interceptor = require('../service/interceptor');

module.exports.savePayment = (conn, res, payment) => {
    let fields = [payment.description];
    conn.query(
        `INSERT INTO payment (description) 
              VALUES (?) ;`, fields, (error, results) => {
            if (error) throw error;
            console.log(`The affectedRows are ::: ${results.affectedRows}`);

            interceptor.response(res, 200, 'SUCCESS', results);
        });
};

module.exports.updatePayment = (conn, res, body) => {
    let {description, id} = body;
    let fields = [description, id];
    conn.query(`UPDATE payment SET description = ? WHERE id = ? ;`, fields, (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.affectedRows}`);

        interceptor.response(res, 200, 'SUCCESS', results);
    });
};

module.exports.deletePayment = (conn, res, id) => {
    conn.query(`DELETE FROM payment WHERE id = ? ;`, parseInt(id), (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.affectedRows}`);

        interceptor.response(res, 200, 'SUCCESS', results);
    });
};

module.exports.getPayment = (conn, res, id) => {
    conn.query(`SELECT * FROM payment WHERE id = ? ;`, id, (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.length}`);

        interceptor.response(res, 200, 'SUCCESS', results[0]);
    });
};

module.exports.findAllPayments = (conn, res) => {
    conn.query(`SELECT * FROM payment ;`, undefined, (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.length}`);

        interceptor.response(res, 200, 'SUCCESS', results);
    });
};
