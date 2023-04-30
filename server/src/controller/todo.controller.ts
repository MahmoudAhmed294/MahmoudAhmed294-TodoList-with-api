import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const addTodoItem = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const { userId }: any = (req as CustomRequest).token;

    const newTodoItem = await prisma.todo.create({
      data: {
        status: false,
        title,
        userId: userId,
      },
    });

    res.status(200).json({
      id: newTodoItem.id,
      title: newTodoItem.title,
      status: newTodoItem.status,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteTodoItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.todo.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json('deleted');
  } catch (error: any) {
    console.log(error.message);
    return res.sendStatus(404);
  }
};

export const getTodoList = async (req: Request, res: Response) => {
  try {
    const { userId }: any = (req as CustomRequest).token;
    const allTodo = await prisma.todo.findMany({
      where: {
        userId,
      },
    });
    return res.status(200).json( allTodo );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const newTodo = await prisma.todo.update({
      where: {
        id: req.params.id,
      },
      data: { title },
    });
    return res.status(200).json({
      id: newTodo.id,
      title: newTodo.title,
      status: newTodo.status,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateTodoStatus = async (req: Request, res: Response) => {
  try {
    const currentStatus = await prisma.todo.findUnique({
      where: { id: req.params.id },
    });
    if (!currentStatus) {
      return res.sendStatus(404);
    }

     await prisma.todo.update({
      where: {
        id: req.params.id,
      },
      data: { status: !currentStatus.status },
    });

    return res.status(200).json("update!");

  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
