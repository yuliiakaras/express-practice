const express = require('express');
const router = express.Router();

const {getStudents, findWorstScore} = require('../controllers/students.controller')

router.get('/', getStudents);
router.get('/worst-homework', findWorstScore);

module.exports = router;
