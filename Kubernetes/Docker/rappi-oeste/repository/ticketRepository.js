const uuidv4 = require('uuid/v4');
const interceptor = require('../service/interceptor');

module.exports.saveTicket = (conn, res, ticket) => {
    let fields = [
        ticket.user_id,
        ticket.start_origin,
        ticket.end_origin,
        ticket.start_date,
        ticket.price,
        ticket.payment_way,
        ticket.payment_way_company,
        uuidv4()
    ];
    conn.query(
        `INSERT INTO ticket (user_id, start_origin, end_origin, start_date, price, payment_way, payment_way_company, passage_code) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?) ;`, fields, (error, results) => {
            if (error) throw error;
            console.log(`The affectedRows are ::: ${results.affectedRows}`);

            interceptor.response(res, 200, 'SUCCESS', results);
        });
};

module.exports.updateTicket = (conn, res, body) => {
    let {user_id, start_origin, end_origin, start_date, price, payment_way, payment_way_company, id} = body;
    let fields = [user_id, start_origin, end_origin, start_date, price, payment_way, payment_way_company, id];
    conn.query(`UPDATE ticket SET user_id = ?, start_origin = ?, end_origin = ?, start_date = ?, price = ?, 
    payment_way = ?, payment_way_company = ? WHERE id = ? ;`, fields, (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.affectedRows}`);

        interceptor.response(res, 200, 'SUCCESS', results);
    });
};

module.exports.deleteTicket = (conn, res, id) => {
    conn.query(`DELETE FROM ticket WHERE id = ? ;`, parseInt(id), (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.affectedRows}`);

        interceptor.response(res, 200, 'SUCCESS', results);
    });
};

module.exports.getTicket = (conn, res, id) => {
    conn.query(`SELECT * FROM ticket WHERE id = ?`, id, (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.length}`);

        interceptor.response(res, 200, 'SUCCESS', results[0]);
    });
};

module.exports.findAllTickets = (conn, res) => {
    conn.query(`SELECT * FROM ticket ;`, undefined, (error, results) => {
        if (error) throw error;
        console.log(`The result count is ::: ${results.length}`);

        interceptor.response(res, 200, 'SUCCESS', results);
    });
};
