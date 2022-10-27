const { Router } = require('express');
const router = Router();

const { getMatchesId, getMatch, createMatch, updateMatch, deleteMatch, deleteMatches } = require('../controllers/matches.controller');

// get
router.get('/matches/:event_id', getMatchesId);
router.get('/match/:id', getMatch);

//post
router.post('/create_match/:event_id', createMatch);

//put
router.put('/update_match/:match_id', updateMatch);

//delete
router.delete('/delete_match/:match_id', deleteMatch);
router.delete('/delete_matches/:event_id', deleteMatches);


module.exports = router;