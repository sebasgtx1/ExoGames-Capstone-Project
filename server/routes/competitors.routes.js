const { Router } = require('express');
const router = Router();

const { getCompetitors, getCompetitorId, getMyCompetitorSport, getMyCompetitorId, getMyCompetitors, createCompetitor, updateCompetitor, deleteCompetitor } = require('../controllers/competitors.controller');

// get
router.get('/competitors', getCompetitors);
router.get('/competitor/:id', getCompetitorId);
router.get('/competitor/:user_id/:id', getMyCompetitorId);
router.get('/competitors/:user_id', getMyCompetitors);
router.get('/competitors_sport/:sport', getMyCompetitorSport);

//post
router.post('/create_competitor', createCompetitor);

//put
router.put('/update_competitor/:id', updateCompetitor);

//delete
router.delete('/delete_competitor/:id', deleteCompetitor);


module.exports = router;