const { Router } = require('express');
const router = Router();

const { checkToken } = require("../auth/token_validation");

const { getVenues, getVenueId, getMyVenues, getMyVenuesId, createVenue, updateVenue, deleteVenue } = require('../controllers/venues.controller');

// get
router.get('/venues', getVenues);
router.get('/venue/:id', getVenueId);
router.get('/my_venue/:user_id/:id', getMyVenuesId, checkToken);
router.get('/venues/:user_id', getMyVenues, checkToken);

//post
router.post('/create_venue', createVenue, checkToken);

//put
router.put('/update_venue/:id', updateVenue, checkToken);

//delete
router.put('/delete_venue/:id', deleteVenue, checkToken);


module.exports = router;