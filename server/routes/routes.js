const { Router } = require('express');
const router = Router();

const { getEvents, getEventId, createEvent, updateEvent, deleteEvent } = require('../controllers/events.controller');

// get
router.get('/', getEvents);
router.get('/events', getEvents);
router.get('/event/:id', getEventId);
router.get('/create_event', createEvent);
router.get('/update_event/:id', updateEvent)
router.get('/delete_event/:id', deleteEvent)
//post
router.post('/create_event', createEvent);
router.post('/update_event', updateEvent);
router.post('/delete_event', deleteEvent);


module.exports = router;