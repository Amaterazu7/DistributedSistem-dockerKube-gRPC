const express = require('express');
const router = express.Router();
const loginRepository = require('../repository/loginRepository');
const interceptor = require('../service/interceptor');

router.post('/', async (req, res, next) => {
    let sqlResult = await loginRepository.findLoginByUserName(res, req.body.user_name);

    if (sqlResult[0]) {
      validatePass(res, sqlResult[0], req.body.password);
    } else {
      interceptor.response(res, 200, 'SUCCESS', {message: "The username does not exist"});
    }
});

const validatePass = (res, statementRes, password) => {
  let buff = Buffer.from(password);
  let base64pass = buff.toString('base64');

  let data = (statementRes.password === base64pass) ? statementRes : { message: "The password is incorrect" };
  interceptor.response(res, 200, 'SUCCESS', data)
};

module.exports = router;
