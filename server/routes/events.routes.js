const { Router } = require('express');
const router = Router();
const { checkToken } = require("../auth/token_validation");

const { getEvents, getMyEvents, getMyEventId, getEventId, createEvent, updateEvent, deleteEvent, un_PublishEvent } = require('../controllers/events.controller');

// get
router.get('/', getEvents);
router.get('/events', getEvents);
router.get('/event/:id', getEventId);
router.get('/my_event/:user_id/:id', getMyEventId);
router.get('/events/:user_id', checkToken, getMyEvents);

//post
router.post('/create_event', checkToken, createEvent);

//put
router.put('/update_event/:id', checkToken, updateEvent);
router.put('/publish/:id', checkToken, un_PublishEvent);

//delete
router.put('/delete_event/:id', checkToken, deleteEvent);


module.exports = router;