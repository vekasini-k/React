import express from 'express';
import auth from '../middleware/auth.js'; 
import { createTodo, deleteTodo, getTodos, updateTodo } from '../Controller/todo.js';

const router = express.Router();

router.get('/get', auth, getTodos);

router.post('/post', auth, createTodo);

router.put('/put/:id', auth, updateTodo);

router.delete('/delete/:id', auth, deleteTodo);

export default router;
