const configLoader = require('../config/configLoader');
const interceptor = require('../service/interceptor');

module.exports.getAllAirport = async (res) => {
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();

        let field = [ ];
        let query = `SELECT * FROM airport ;`;
        return await interceptor.dbRequest(conn, query, field, `The result count is :::`, true);

    } catch (err) {
        interceptor.response(res, 500, 'AIRPORT FILTER FAILED', {}, err);
    } finally {
        conn.end();
    }
};

module.exports.getTicketByUser = async (res, user_id) => {
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();

        let field = [ user_id ];
        let query = `SELECT * FROM ticket WHERE user_id = ? ;`;
        return await interceptor.dbRequest(conn, query, field, `The result count is :::`, true);

    } catch (err) {
        interceptor.response(res, 500, 'TICKET FILTER FAILED', {}, err);
    } finally {
        conn.end();
    }
};

module.exports.getFlightByFilters = async (res, filters) => {
    let {airportFrom, airportTo, date_from, date_to} = filters;
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();

        // let field = [ airport_code_from, airport_code_to, date_from, date_to ];
        let field = [ airportFrom.code, airportTo.code, date_from, date_to ];
        let query = `SELECT * FROM flight WHERE airport_code_from = ? AND airport_code_to = ?  
                     AND start_date > ? AND end_date < ? ;`;

        return await interceptor.dbRequest(conn, query, field, `The result count is :::`, true);

    } catch (err) {
        interceptor.response(res, 500, 'FLIGHT FILTER FAILED', {}, err);
    } finally {
        conn.end();
    }
};
