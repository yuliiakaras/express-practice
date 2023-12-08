import { Router } from 'express';
import bodyParser from 'body-parser';

const router = Router();
router.use(bodyParser.json());

import { validateNewArticle, validateTypeEdition } from '../../middleware/articles.middleware.js';
import { getArticles, addNewArticle, updateArticleTags } from './contoller.js';

router.get('/', getArticles);
router.post('/', validateNewArticle, addNewArticle);
router.patch('/:id', validateTypeEdition, updateArticleTags);

export default router;
