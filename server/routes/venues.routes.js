const { Router } = require('express');
const router = Router();

const { getVenues, getVenueId, createVenue, updateVenue, deleteVenue } = require('../controllers/venues.controller');

// get
router.get('/venues', getVenues);
router.get('/venue/:id', getVenueId);

//post
router.post('/create_venue', createVenue);

//put
router.put('/update_venue/:id', updateVenue);

//delete
router.delete('/delete_venue/:id', deleteVenue);


module.exports = router;