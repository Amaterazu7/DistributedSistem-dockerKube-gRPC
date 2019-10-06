const express = require('express');
const router = express.Router();
const userRepository = require('../repository/userRepository');
const configLoader = require('../config/configLoader');
const interceptor = require('../service/interceptor');

router.post('/', async (req, res, next) => {
    let idResult = await userRepository.saveUser(res, req.body);
    interceptor.response(res, 200, 'SUCCESS', idResult);
});

router.put('/', async (req, res, next) => {
  let conn;
  try {
    conn = await configLoader.getMySQL_connection();

    await conn.connect();
    await userRepository.updateUser(conn, res, req.body);

  } catch (err) {
    interceptor.response(res, 500, 'UPDATE FAILED', {}, err);
  } finally {
    conn.end();
  }
});

router.get('/', async (req, res, next) => {
  let conn;
  try {
    conn = await configLoader.getMySQL_connection();

    await conn.connect();
    await userRepository.findAllUsers(conn, res);

   } catch (err) {
    interceptor.response(res, 500, 'SELECT ALL FILED', {}, err);
  } finally {
    conn.end();
  }
});

router.get('/:id', async (req, res, next) => {
  let conn;
  try {
    conn = await configLoader.getMySQL_connection();

    await conn.connect();
    await userRepository.getUser(conn, res, req.params.id);

  } catch (err) {
    interceptor.response(res, 500, 'SELECT FAILED', {}, err);
  } finally {
    conn.end();
  }
});

router.get('/miles/:id', async (req, res, next) => {
  let result = await userRepository.getUserMiles(res, req.params.id);
  interceptor.response(res, 200, 'SUCCESS', {userMiles: result[0][0].totalMiles});
});

router.delete('/:id', async (req, res, next) => {
  let conn;
  try {
    conn = await configLoader.getMySQL_connection();

    await conn.connect();
    await userRepository.deleteUser(conn, res, req.params.id);

  } catch (err) {
    interceptor.response(res, 500, 'DELETE FAILED', {}, err);
  } finally {
    conn.end();
  }
});

module.exports = router;
