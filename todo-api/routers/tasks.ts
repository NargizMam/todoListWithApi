import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Task from '../models/Task';
import mongoose from 'mongoose';
import { TaskApi, TaskMutation } from '../types';

const tasksRouter = express.Router();

tasksRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const tasksList = await Task.find();
    res.send(tasksList);
  } catch (e) {
    next(e);
  }
});
tasksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).send({ error: 'No user!' });
    if (!req.body.title) return res.send('Enter tasks title !');
    const newTask: TaskMutation = {
      title: req.body.title,
      description: req.body.description || null,
      status: req.body.status ? req.body.status : 'new',
      user: userId.toString(),
    };
    const createTask = new Task(newTask);
    await createTask.save();
    return res.send('Task was created!');
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      next(e);
    }
  }
});
tasksRouter.put('/:id', auth, async (req: RequestWithUser, res, next) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).send({ error: 'No user!' });
    const updatedTask = await Task.findById<TaskApi>(taskId);
    if (!updatedTask) return res.status(404).send({ error: 'Task not found!' });
    if (updatedTask.user.toString() !== userId.toString()) {
      return res.status(403).send({ error: "You don't have permission!" });
    }
    const updatingTask = {
      ...updatedTask,
      title,
      description,
      status,
      user: userId,
    };
    const newTask = new Task(updatingTask);
    await newTask.save();
    return res.send(newTask);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      next(e);
    }
  }
});
tasksRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  const taskId = req.params.id;
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).send({ error: 'No user!' });
    const deletedTask = await Task.findById(taskId);
    if (!deletedTask) return res.status(404).send({ error: 'Task not found!' });
    if (deletedTask.user.toString() !== userId.toString()) {
      return res.status(403).send({ error: "You don't have permission!" });
    }
    await deletedTask.deleteOne();
    return res.send('Task was deleted!');
  } catch (e) {
    next(e);
  }
});

export default tasksRouter;
