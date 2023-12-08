import { readDataFromFile, writeDataToFile } from '../../helpers/helpers.js';
import { v4 as uuidv4 } from 'uuid'; 

export async function getUsers(req, res, next) {
    try {
        const users = await readDataFromFile('./data/users.json');
        res.json(users);
        
    } catch (error) {
        next(error)
    }
}

export async function addNewUser(req, res, next) {
    try{
        const users = await readDataFromFile('./data/users.json');

    if(req.body){
        const newUser = req.body;
        newUser.id = newUser.id || uuidv4();
        users.push(newUser);

        await writeDataToFile('./data/users.json', users); 
        res.status(201).json(newUser);
    }
    
    } catch(error) {
        console.error('Error adding new user', error);
        next(error)
    }
}

export async function getUserByEmail(req, res, next) {
    try {
        const users = await readDataFromFile('./data/users.json');
        const userEmail = req.params.email;

        const user = users.find(user => user.email === userEmail);

        if(user) {
            res.json(user);
        } else {
            const error = new Error('User not found');
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        console.error('Error retrieving user by email:', error);
        next(error);
    }
}

export async function editUser(req, res, next) {
    try {
        const users = await readDataFromFile('./data/users.json')
        const userId = req.params.id;
        const dataToUpdate = req.body;

        const userIndex = users.findIndex(user => user.id === userId);

        if(userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...dataToUpdate};
            await writeDataToFile('./data/users.json', users);
            res.json(users[userIndex])
        } else {
            const error = new Error('User not found');
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        console.error('Error patching user data:', error);
        next(error);
    }
}

export async function deleteUser(req, res, next) {
    try {
        const users = await readDataFromFile('./data/users.json');
        const userEmail = req.params.email;

        const userIndex = users.findIndex(user => user.email === userEmail);

        if(userIndex !== -1) {
            users.splice(userIndex, 1);
            await writeDataToFile('./data/users.json', users);
            res.json({ message: 'User deleted successfully' });
        } else {
            const error = new Error('User not found');
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        console.error('Error deleting user by email:', error);
        next(error);
    }
}
