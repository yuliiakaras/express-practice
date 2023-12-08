import { validateContent } from '../helpers/validation.js';

export function validateNewUser(req, res, next) {
    const requiredProperties = ['firstName', 'lastName', 'email', 'password', 'address'];
    validateContent(req, res, next, requiredProperties);    
}
