const express = require('express');
const router = express.Router();
const paymentRepository = require('../repository/paymentRepository');
const configLoader = require('../config/configLoader');
const interceptor = require('../service/interceptor');

router.post('/', async (req, res, next) => {
    let conn;
    try {
        conn = await configLoader.getMySQL_connection();

        await conn.connect();
        await paymentRepository.savePayment(conn, res, req.body);

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
        await paymentRepository.updatePayment(conn, res, req.body);

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
        await paymentRepository.findAllPayments(conn, res);

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
        await paymentRepository.getPayment(conn, res, req.params.id);

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
        await paymentRepository.deletePayment(conn, res, req.params.id);

    } catch (err) {
        interceptor.response(res, 500, 'DELETE FAILED', {}, err);
    } finally {
        conn.end();
    }
});

module.exports = router;
