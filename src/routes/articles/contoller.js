const { v4: uuidv4 } = require('uuid'); 
const {readDataFromFile, writeDataToFile} = require('../../helpers/helpers');

exports.getArticles = async (req, res, next) => {
    try {
        const articles = await readDataFromFile('./data/articles.json');
        res.json(articles);
    } catch (error) {
        next(error)
    }
}

exports.addNewArticle = async (req, res, next) => {
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

exports.updateArticleTags = async (req, res, next) => {
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
