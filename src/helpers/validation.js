module.exports.validateContent = (req, res, next, properties) => {
    const newUser = req.body;
    if (typeof newUser !== 'object' || newUser === null) {
        const error = new Error('Request body must be a valid JSON object');
        error.statusCode = 400;
        next(error);
    }

    const missingProperties = properties.filter(prop => !newUser.hasOwnProperty(prop));

    if (missingProperties.length > 0) {
        const error = new Error(`Missing properties: ${missingProperties.join(', ')}`);
        error.statusCode = 400;
        next(error);
    }
    next();
}