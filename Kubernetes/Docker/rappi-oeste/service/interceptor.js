
module.exports.response = (res, code, status, data, error = null) => {
    if(error) console.error('ERROR ::: ' + JSON.stringify(error, undefined, 2));
    res.status(code).json({status: status, data: data, error: error});
};

module.exports.dbRequest = async (connection, sqlQuery, fields, message, length = false) => {
    return await new Promise( (resolve, reject) => {
        connection.query(sqlQuery, fields, async (error, results) => {
            console.log(`${message} ${(length) ? results.length : results.affectedRows}`);
            return (error) ? reject(error) : resolve(results);
        })
    });
};
