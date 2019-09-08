const express = require('express');
const router = express.Router();
const userRepository = require('../repository/userRepository');
const configLoader = require('../config/configLoader');
const interceptor = require('../service/interceptor');

router.post('/', async (req, res, next) => {
  let conn;
  try {
    conn = await configLoader.getMySQL_connection();

    await conn.connect();
    await userRepository.saveUser(conn, res, req.body);

  } catch (err) {
    interceptor.response(res, 500, 'INSERT FAILED', {}, err);
  } finally {
    conn.end();
  }
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
