const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const {validateNewArticle, validateTypeEdition} = require('../../middleware/articles.middleware')
const {getArticles, addNewArticle, updateArticleTags } = require('./contoller')

router.get('/', getArticles);
router.post('/', validateNewArticle, addNewArticle);
router.patch('/:id', validateTypeEdition, updateArticleTags);

module.exports = router;
