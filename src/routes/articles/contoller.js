import { v4 as uuidv4 } from 'uuid'; 
import { readDataFromFile, writeDataToFile } from '../../helpers/helpers.js';

export async function getArticles(req, res, next) {
    try {
        const articles = await readDataFromFile('./data/articles.json');
        res.json(articles);
    } catch (error) {
        next(error)
    }
}

export async function addNewArticle(req, res, next) {
    try {
        const articles = await readDataFromFile('./data/articles.json');
        const newArticle = req.body;
        newArticle.id = newArticle.id || uuidv4();
        articles.push(newArticle);

        await writeDataToFile('./data/articles.json', articles);

        res.status(201).json(newArticle);
    } catch (error) {
        console.error('Error adding new article', error);
        next(error)
    }
}

export async function updateArticleTags(req, res, next) {
    try {
        const articles = await readDataFromFile('./data/articles.json');
        const articleId = req.params.id;
        const tagsToUpdate = req.body.tags;

        const articleIndex = articles.findIndex(user => user.id === articleId);

        if(articleIndex !== -1) {
            articles[articleIndex].tags = tagsToUpdate;
            await writeDataToFile('./data/articles.json', articles);
            res.json(articles[articleIndex])
        } else {
            const error = new Error('Article not found');
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        console.error('Error patching article tags:', error);
        next(error);
    }
}
