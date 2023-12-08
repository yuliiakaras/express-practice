const express = require('express');

const app = express();
const port = 3000;

const {requestLogger} = require('./src/middleware/logger.middleware');
app.use(requestLogger);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const usersRouter = require('./src/routes/users');
app.use('/users', usersRouter);

const studentsRouter = require('./src/routes/students')
app.use('/students', studentsRouter);

const articlesRouter = require('./src/routes/articles')
app.use('/articles', articlesRouter);

const {errorHandler} = require('./src/middleware/errors.middleware')
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});