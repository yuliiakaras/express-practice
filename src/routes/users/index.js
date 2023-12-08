import { Router } from 'express';
import bodyParser from 'body-parser';

const router = Router();
router.use(bodyParser.json());

import { validateNewUser } from '../../middleware/users.middleware.js';
import { getUsers, addNewUser, getUserByEmail, editUser, deleteUser } from './controller.js';

router.get('/', getUsers);
router.post('/', validateNewUser, addNewUser);
router.get('/:email', getUserByEmail);
router.patch('/:id', editUser)
router.delete('/:email', deleteUser)

export default router;