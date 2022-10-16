const {
  createUser,
  getUserById,
  getUsers,
  updateUsers,
  deleteUser,
} = require("../controllers/users.controller");
const router = require("express").Router();

router.post("/create_user", createUser);
router.get("/getUsers", getUsers);
router.get("/get_user/:id", getUserById);
router.patch("/update_user", updateUsers);
router.delete("/delete_user:", deleteUser);

module.exports = router;
