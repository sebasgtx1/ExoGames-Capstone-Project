const { Router } = require('express');
const router = Router();

const { getMatchesId, createMatch, updateMatch, deleteMatch } = require('../controllers/matches.controller');

// get
router.get('/match/:event_id', getMatchesId);

//post
router.post('/create_match/:event_id', createMatch);

//put
router.put('/update_match/:match_id', updateMatch);

//delete
router.delete('/delete_match/:match_id', deleteMatch);


module.exports = router;