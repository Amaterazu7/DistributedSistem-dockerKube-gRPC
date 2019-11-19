const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const filterRepository = require('../repository/filterRepository');
const userRepository = require('../repository/userRepository');
const interceptor = require('../service/interceptor');

router.get('/airport', async (req, res, next) => {
    let sqlResult = await filterRepository.getAirport(res);
    interceptor.response(res, 200, 'SUCCESS', {airportList: sqlResult[0]});
});

router.get('/allAirport', async (req, res, next) => {
    let sqlResult = await filterRepository.getAllAirport(res);
    interceptor.response(res, 200, 'SUCCESS', {airportList: sqlResult[0]});
});

router.get('/ticket/:code', async (req, res, next) => {
    let sqlResult = await filterRepository.getTicketByCode(res, req.params.code);
    interceptor.response(res, 200, 'SUCCESS', {ticketList: sqlResult});
});

router.post('/ticketByFilter', async (req, res, next) => {
    let sqlResult = await filterRepository.getTicketByUser(res, req.body);
    interceptor.response(res, 200, 'SUCCESS', {ticketList: sqlResult});
});

router.post('/ticket', async (req, res, next) => {
    let { flightList, user, payment, creditCard } = req.body;
    let correlation_id = uuidv4();

    if (user.registered === false) { user.id = await userRepository.saveUser(res, user); }
    for(let i = 0; i < flightList.length; i++) {
        await filterRepository.saveTicket(res, user, payment.id, creditCard.companyName, flightList[i], correlation_id)
    }

    interceptor.response(res, 200, 'SUCCESS', {code: correlation_id});
});

router.post('/ticketByMiles', async (req, res, next) => {
    let { flightList, user, payment } = req.body;
    let correlation_id = uuidv4();
    let availableMiles = await filterRepository.checkAvailableMiles(res, user, flightList);

    if (availableMiles) {
        for(let i = 0; i < flightList.length; i++) {
            await filterRepository.saveTicket(res, user, payment.id, payment.description, flightList[i], correlation_id)
        }
        // CREATE A CONSUMPTION OF MILES BY CORRELATION_ID, PRICE AND MILES_RELATIONSHIP
        interceptor.response(res, 200, 'SUCCESS', {availableMiles: availableMiles, code: correlation_id});

    } else {
        interceptor.response(res, 200, 'SUCCESS', {availableMiles: availableMiles, message: `Don't have enough Miles`});
    }
});

router.post('/flight', async (req, res, next) => {
    let sqlResult = await filterRepository.getFlightByFilters(res, req.body);
    interceptor.response(res, 200, 'SUCCESS',
        {flightStartList: sqlResult.going, flightEndList: sqlResult.returning});
});

router.put('/cancel', async (req, res, next) => {
    let sqlResult = await filterRepository.cancelTicket(res, req.body);
    interceptor.response(res, 200, 'SUCCESS', {cancelRes: sqlResult});
});


module.exports = router;
