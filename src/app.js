import express from 'express';

const app = express();
const port = 3000;

import requestLogger from './middleware/logger.middleware.js';
app.use(requestLogger);

import bodyParser from 'body-parser';
app.use(bodyParser.json());

import usersRouter from './routes/users/index.js';
app.use('/users', usersRouter);

import studentsRouter from './routes/students/index.js';
app.use('/students', studentsRouter);

import articlesRouter from './routes/articles/index.js';
app.use('/articles', articlesRouter);

import { errorHandler } from './middleware/errors.middleware.js';
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});