import express from 'express';
import { createTask,deleteTask,getAllTasks,getTaskInfo,updateTask } from '../controllers/taskController';

const router = express.Router();

router.post("/task", createTask);
router.get("/tasks", getAllTasks);
router.get("/task/:id", getTaskInfo);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
