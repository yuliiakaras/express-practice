const {validateContent} = require('../helpers/validation')

module.exports.validateNewUser = (req, res, next) => {
    const requiredProperties = ['firstName', 'lastName', 'email', 'password', 'address'];
    validateContent(req, res, next, requiredProperties);    
}
