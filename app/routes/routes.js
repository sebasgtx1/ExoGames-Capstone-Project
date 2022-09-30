const { Router } = require('express');
const router = Router();


const { getEvents, getEventId, createEvent, updateEvent, deleteEvent } = require('../controllers/events.controller');
const { mainPage, loginPage, venuesPage, competitorsPage, usersPage } = require('../controllers/index.web_static');

router.get('/', mainPage);
router.get('/index.html', mainPage);
router.get('/login', loginPage);
router.get('/venues', venuesPage);
router.get('/competitors', competitorsPage);
router.get('/users', usersPage);
router.get('/', getEvents);
router.get('/event/:id', getEventId);
router.post('/create_event', createEvent);
router.put('/event/:id', updateEvent)
router.delete('/event/:id', deleteEvent);

module.exports = router;