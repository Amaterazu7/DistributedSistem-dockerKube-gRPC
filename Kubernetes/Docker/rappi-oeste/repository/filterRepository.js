const configLoader = require('../config/configLoader');
const interceptor = require('../service/interceptor');
const uuidv4 = require('uuid/v4');

module.exports.getAllAirport = async (res) => {
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();

        let field = [ ];
        let query = `CALL get_airports(); `;
        return await interceptor.dbRequest(conn, query, field, `The result count is :::`, true);

    } catch (err) {
        interceptor.response(res, 500, 'AIRPORT FILTER FAILED', {}, err);
    } finally {
        conn.end();
    }
};

module.exports.getTicketByCode = async (res, code) => {
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();

        let field = [ code ];
        let queryTicket = `CALL get_ticket_by_code(?); `;
        let results = await interceptor.dbRequest(conn, queryTicket, field, `The result count is :::`, true);

        return results[0];
    } catch (err) {
        interceptor.response(res, 500, 'TICKET FILTER FAILED', {}, err);
    } finally {
        conn.end();
    }
};

module.exports.getTicketByUser = async (res, request) => {
    const { user_id, airport_from, airport_to, date_start, date_end } = request;
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();
        let queryTicket = `CALL get_ticket_flight_by_id(?, ?, ?, ?, ?); `;
        let results = await interceptor.dbRequest(conn, queryTicket,
            [user_id, airport_from, airport_to, date_start, date_end],
            `The result count is :::`, true);

        return results[0];

    } catch (err) {
        interceptor.response(res, 500, 'TICKET FILTER FAILED', {}, err);
    } finally {
        conn.end();
    }
};

module.exports.saveTicketByCash = async (res, user, payment, companyName, flight_id, correlation_id) => {
    let {id, registered} = user;
    let season_version = 1;
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();
        let code = uuidv4();
        let field = [ flight_id, id, code, payment, companyName, season_version, correlation_id, registered ];
        let query = `CALL create_ticket_by_cash(?, ?, ?, ?, ?, ?, ?, ?); `;
        await interceptor.dbRequest(conn, query, field, `The result count is :::`, true);
        return code;

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

        let fieldGo = [ airportFrom.code, airportTo.code, date_from, date_to ];
        let fieldRe = [ airportTo.code, airportFrom.code, date_from, date_to ];
        let queryGo = `CALL get_flight_by_filters(?, ?, ?, ?); `;
        let queryRe = `CALL get_flight_by_filters(?, ?, ?, ?); `;

        let goingRes = await interceptor.dbRequest(conn, queryGo, fieldGo, `The result count is :::`, true);
        let returnRes = await interceptor.dbRequest(conn, queryRe, fieldRe, `The result count is :::`, true);

        return { going: goingRes[0], returning: returnRes[0]};
    } catch (err) {
        interceptor.response(res, 500, 'FLIGHT FILTER FAILED', {}, err);
    } finally {
        conn.end();
    }
};

module.exports.cancelTicket = async (res, request) => {
    let {code, both} = request;
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();

        let field = [ code, both ];
        let query = `CALL cancel_ticket(?, ?); `;

        return await interceptor.dbRequest(conn, query, field, `The result count is :::`, true);

    } catch (err) {
        interceptor.response(res, 500, 'CANCEL TICKET FAILED', {}, err);
    } finally {
        conn.end();
    }
};
