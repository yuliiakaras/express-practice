const express = require('express');

const app = express();
const port = 3000;

const {requestLogger} = require('./middleware/logger.middleware');
app.use(requestLogger);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const usersRouter = require('./routes/users/index');
app.use('/users', usersRouter);

const studentsRouter = require('./routes/students/index')
app.use('/students', studentsRouter);

const articlesRouter = require('./routes/articles/index')
app.use('/articles', articlesRouter);

const {errorHandler} = require('./middleware/errors.middleware')
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});