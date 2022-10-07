const { Router } = require('express');
const router = Router();

const { getCompetitors, getCompetitorId, createCompetitor, updateCompetitor, deleteCompetitor } = require('../controllers/competitors.controller');

// get
router.get('/competitors', getCompetitors);
router.get('/competitor/:id', getCompetitorId);

//post
router.post('/create_competitor', createCompetitor);

//put
router.put('/update_competitor/:id', updateCompetitor);

//delete
router.delete('/delete_competitor/:id', deleteCompetitor);


module.exports = router;