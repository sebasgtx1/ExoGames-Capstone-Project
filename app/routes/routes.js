const { Router } = require('express');
const router = Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/index.controller');
const { mainPage, loginPage, venuesPage } = require('../controllers/index.web_static');

router.get('/', mainPage);
router.get('/index.html', mainPage);
router.get('/login', loginPage);
router.get('/venues', venuesPage);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);

module.exports = router;