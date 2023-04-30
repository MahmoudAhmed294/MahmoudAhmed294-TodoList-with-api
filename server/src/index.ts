import "dotenv/config";
import express from "express";
import config from "./config"
import usersRouter from './router/auth.route';
import todoRouter from './router/todo.route';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

app.get('/', (_, res) => {
  res.send('Welcome to Todo server!');
});

app.use('/api/auth', usersRouter);
app.use('/api/todo', todoRouter);


app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});

