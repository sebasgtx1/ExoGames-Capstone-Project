const { createUser } = require("../controllers/users.controller");
const router = require("express").Router();

router.post("/create_user", createUser);

module.exports = router;
