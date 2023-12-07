const express = require('express');
const fs = require('fs/promises');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { v4: uuidv4 } = require('uuid'); 

// get user array +
app.get('/users', async (req, res) => {
    try {
        const users = await readDataFromFile('./data/users.json');
        res.json(users);
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// add a new user +
app.post('/users', async (req, res) => {
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// get user by email +
app.get('/users/:email', async (req, res) => {
    try {
        const users = await readDataFromFile('./data/users.json');
        const userEmail = req.params.email;

        const user = users.find(user => user.email === userEmail);

        if(user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        console.error('Error retrieving user by email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// update user by id +
app.patch('/users/:id', async (req, res) => {
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
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error patching user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

// delete user by email +
app.delete('/users/:email', async (req, res) => {
    try {
        const users = await readDataFromFile('./data/users.json');
        const userEmail = req.params.email;

        const userIndex = users.findIndex(user => user.email === userEmail);

        if(userIndex !== -1) {
            users.splice(userIndex, 1);
            await fs.writeFile('./data/users.json', JSON.stringify(users, null, 2), 'utf-8');
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        console.error('Error deleting user by email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// get all students + 
app.get('/students', async (req, res) => {
    try {
        const students = await readDataFromFile('./data/studentStatistics.json');
        res.json(students);
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//find looser +
app.get('/students/worst-homework', async (req, res) => {
    try {
        const students = await readDataFromFile('./data/studentStatistics.json');

        let worstScore = Infinity;
        let worstStudent = null;

        for(const student of students) {
            const homeworkScore = student.scores.find(score => score.type === 'homework')?.score;

            if(homeworkScore !== undefined && homeworkScore < worstScore) {
                worstScore = homeworkScore;
                worstStudent = student;
            }
        }

        if(worstStudent) {
            res.json(worstStudent);
        }
        else{
            res.sendStatus(404).json({error: 'No student found with homework scores'})
            }
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get articles + 
app.get('/articles', async (req, res) => {
    try {
        const articles = await readDataFromFile('./data/articles.json');
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// add an article + 
app.post('/articles', async (req, res) => {
    try {
        const articles = await readDataFromFile('./data/articles.json');
        const newArticle = req.body;
        newArticle.id = newArticle.id || uuidv4();
        articles.push(newArticle);

        await writeDataToFile('./data/articles.json', articles);

        res.status(201).json(newArticle);
    } catch (error) {
        console.error('Error adding new article', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.patch('/articles/:id', async (req, res) => {
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
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (error) {
        console.error('Error patching article tags:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


async function readDataFromFile(filepath) {
    try {
        const articlesData = await fs.readFile(filepath, 'utf-8');
        return JSON.parse(articlesData);
        
    } catch (error) {
        console.error(`Error reading data from file ${filepath}: ${error}`);
        throw error;
    }
}

async function writeDataToFile(filepath, data) {
    try {
        await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8')
    } catch (error) {
        console.error(`Error writing data to file ${filepath}: ${error}`);
        throw error;
    }
}


















app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});