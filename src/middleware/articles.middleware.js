import { validateContent } from '../helpers/validation.js';

export function validateNewArticle(req, res, next) {
    const requiredProperties = ['name', 'description', 'type', 'tags'];
    validateContent(req, res, next, requiredProperties); 
}

export function validateTypeEdition(req, res, next) {
    const requiredProperties = ['tags'];
    validateContent(req, res, next, requiredProperties); 
}
