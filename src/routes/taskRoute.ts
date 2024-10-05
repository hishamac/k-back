import express from 'express';
import { createTask,deleteTask,getAllTasks,getTaskInfo,updateTask,getTaskBySkill,getTaskByUser } from '../controllers/taskController';

const router = express.Router();

router.post("/task", createTask);
router.get("/tasks", getAllTasks);
router.get("/task/:id", getTaskInfo);
router.get("/task/user/:id", getTaskByUser);
router.get("/task/skill/:id", getTaskBySkill);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
