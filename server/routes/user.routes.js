const { Router } = require('express');
const router = Router();
const {
  createUser,
  getUsers,
  updateUsers,
  deleteUser,
  login,
  getUserByUserId,
} = require("../controllers/users.controller");

const { checkToken } = require("../auth/token_validation");

router.post("/create_user", createUser);
router.get("/getUsers", checkToken, getUsers);
router.get("/get_user/:id", checkToken, getUserByUserId);
router.patch("/update_user", checkToken, updateUsers);
router.delete("/delete_user:", checkToken, deleteUser);
router.post("/login_user", login);

module.exports = router;
