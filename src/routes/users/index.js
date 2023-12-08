const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const {validateNewUser} = require('../../middleware/users.middleware')
const {getUsers, addNewUser, getUserByEmail, editUser, deleteUser} = require('./controller');

router.get('/', getUsers);
router.post('/', validateNewUser, addNewUser);
router.get('/:email', getUserByEmail);
router.patch('/:id', editUser)
router.delete('/:email', deleteUser)

module.exports = router;