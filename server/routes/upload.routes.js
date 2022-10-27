const { Router } = require('express');
const router = Router();

const { uploadFile } = require('../controllers/upload.controller');

router.post('/upload', uploadFile);

module.exports = router;