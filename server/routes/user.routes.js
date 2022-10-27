const { Router } = require('express');
const router = Router();
const { createUser, getUsers, updateUsers, deleteUser, login, getUserByUserId } = require("../controllers/users.controller");

const { checkToken } = require("../auth/token_validation");

// get request
router.get("/getUsers", checkToken, getUsers);
router.get("/user/:id", checkToken, getUserByUserId);

//post request
router.post("/login", login);
router.post("/create_user", createUser);

//put request
router.put("/update_user/:id", checkToken, updateUsers);
router.put("/delete_user/:id", checkToken, deleteUser);

module.exports = router;
