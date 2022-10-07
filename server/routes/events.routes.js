const { Router } = require('express');
const router = Router();

const { getEvents, getEventId, createEvent, updateEvent, deleteEvent } = require('../controllers/events.controller');

// get
router.get('/', getEvents);
router.get('/events', getEvents);
router.get('/event/:id', getEventId);

//post
router.post('/create_event', createEvent);

//put
router.put('/update_event/:id', updateEvent);

//delete
router.delete('/delete_event/:id', deleteEvent);


module.exports = router;