import { Router } from 'express';
const router = Router();

import { getStudents, findWorstScore } from './controller.js';

router.get('/', getStudents);
router.get('/worst-homework', findWorstScore);

export default router;
