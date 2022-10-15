const { Router } = require('express');
const router = Router();
const { createUser } = require("../controllers/users.controller");


router.post("/create_user", createUser);

module.exports = router;
