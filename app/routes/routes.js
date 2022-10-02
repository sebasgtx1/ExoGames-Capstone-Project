const { Router } = require('express');
const router = Router();

const { getEvents, getEventId, createEvent, updateEvent, deleteEvent } = require('../controllers/events.controller');
const { mainPage, loginPage, venuesPage, createEventPage } = require('../controllers/index.web_static');
//const { getRules, createRules, updateRules, deleteRules } = require('../controllers/rules.controller');
//const { getMatches, createMatch, updateMatch, deleteMatch } = require('../controllers/match.controller');
//const { getCompetitors, getCompetitor, createCompetitor, updateCompetitor, deleteCompetitor } = require('../controllers/competitor.controller');


router.get('/', mainPage);
router.get('/index.html', mainPage);
router.get('/login', loginPage);
router.get('/venues', venuesPage);
router.get('/events', getEvents);
router.get('/event/:id', getEventId);

router.get('/create_event', createEventPage);
router.post('/create_event', createEvent);

router.put('/event/:id', updateEvent)
router.delete('/event/:id', deleteEvent);

module.exports = router;