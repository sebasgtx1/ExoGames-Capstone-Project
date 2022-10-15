const { Router } = require('express');
const router = Router();

const { getVenues, getVenueId, getMyVenues, getMyVenuesId, createVenue, updateVenue, deleteVenue } = require('../controllers/venues.controller');

// get
router.get('/venues', getVenues);
router.get('/venue/:id', getVenueId);
router.get('/venue/:user_id/:id', getMyVenuesId);
router.get('/venues/:user_id', getMyVenues);

//post
router.post('/create_venue', createVenue);

//put
router.put('/update_venue/:id', updateVenue);

//delete
router.put('/delete_venue/:id', deleteVenue);


module.exports = router;