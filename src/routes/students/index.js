const express = require('express');
const router = express.Router();

const {getStudents, findWorstScore} = require('./controller')

router.get('/', getStudents);
router.get('/worst-homework', findWorstScore);

module.exports = router;
