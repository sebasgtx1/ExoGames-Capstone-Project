const { Router } = require('express');
const router = Router();

const { getEvents, getMyEvents, getMyEventId, getEventId, createEvent, updateEvent, deleteEvent, un_PublishEvent } = require('../controllers/events.controller');

// get
router.get('/', getEvents);
router.get('/events', getEvents);
router.get('/event/:id', getEventId);
router.get('/event/:user_id/:id', getMyEventId);
router.get('/events/:user_id', getMyEvents);

//post
router.post('/create_event', createEvent);

//put
router.put('/update_event/:id', updateEvent);
router.put('/publish/:id', un_PublishEvent);

//delete
router.put('/delete_event/:id', deleteEvent);


module.exports = router;