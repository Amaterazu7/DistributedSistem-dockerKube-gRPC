const express = require('express');
const router = express.Router();
const filterRepository = require('../repository/filterRepository');
const interceptor = require('../service/interceptor');

router.get('/airport', async (req, res, next) => {
    let sqlResult = await filterRepository.getAllAirport(res);
    interceptor.response(res, 200, 'SUCCESS', {airportList: sqlResult});
});

router.get('/ticket/:user_id', async (req, res, next) => {
    let sqlResult = await filterRepository.getTicketByUser(res, req.params.user_id);
    interceptor.response(res, 200, 'SUCCESS', {ticketList: sqlResult});
});

router.post('/flight', async (req, res, next) => {
    console.log(JSON.stringify(req.body));
    let sqlResult = await filterRepository.getFlightByFilters(res, req.body);
    interceptor.response(res, 200, 'SUCCESS', {flightList: sqlResult});
});


module.exports = router;
