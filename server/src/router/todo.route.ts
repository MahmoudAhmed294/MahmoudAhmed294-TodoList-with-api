import * as todoController from '../controller/todo.controller';
import { Router } from 'express';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, todoController.addTodoItem);

router.delete('/:id', auth, todoController.deleteTodoItem);

router.put('/:id', auth, todoController.updateTodo);

router.get('/all', auth, todoController.getTodoList);

router.patch('/:id', auth, todoController.updateTodoStatus);

export default router;
