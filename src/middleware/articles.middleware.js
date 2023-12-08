const {validateContent} = require('../helpers/validation')

module.exports.validateNewArticle = (req, res, next) => {
    const requiredProperties = ['name', 'description', 'type', 'tags'];
    validateContent(req, res, next, requiredProperties); 
}

module.exports.validateTypeEdition = (req, res, next) => {
    const requiredProperties = ['tags'];
    validateContent(req, res, next, requiredProperties); 
}
