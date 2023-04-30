import "dotenv/config";
import express from "express";
import config from "./config"
import usersRouter from './router/auth.route';
import todoRouter from './router/todo.route';
import cors from 'cors';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (_, res) => {
  res.send('Welcome to my app!');
});

app.use('/api/auth', usersRouter);
app.use('/api/todo', todoRouter);


app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});

