module.exports.validateContent = (req, res, next, properties) => {
    
    const newUser = req.body;
    if (typeof newUser !== 'object' || newUser === null) {
        return next(new Error ('Request body must be a valid JSON object'));
    }

    const missingProperties = properties.filter(prop => !newUser.hasOwnProperty(prop));

    if (missingProperties.length > 0) {
        return next(new Error (`Missing properties: ${missingProperties.join(', ')}`));
    }
    next();
}
