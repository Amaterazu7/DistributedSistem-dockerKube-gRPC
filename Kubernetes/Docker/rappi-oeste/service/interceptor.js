
module.exports.response = (res, code, status, data, error = null) => {
    if(error) console.error('ERROR ::: ' + JSON.stringify(error, undefined, 2));
    res.status(code).json({status: status, data: data, error: error});
};


