const configModel = require('./configModel');
const mysql = require('mysql');

module.exports.getMySQL_connection = () => {
    let mysqlConnection;
    try {
        const config = configModel.config('DEV');
        mysqlConnection = mysql.createConnection({
            multipleStatements: true,
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_DATABASE,
            pool: config.POOL_MAX
        });
        console.log('Successfully loaded config');
        return mysqlConnection;
    } catch(e) {
        console.error('Failed to get configuration.', e);
        throw e;
    }
};
