const configLoader = require('../config/configLoader');
const interceptor = require('../service/interceptor');

module.exports.findLoginByUserName = async (res, user_name) => {
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();
        await conn.connect();

        let field = [ user_name ];
        let query = `CALL login (?);`;
        return await interceptor.dbRequest(conn, query, field, `The result count is :::`, true);

    } catch (err) {
        interceptor.response(res, 500, 'LOGIN FAILED', {}, err);
    } finally {
        conn.end();
    }
};
