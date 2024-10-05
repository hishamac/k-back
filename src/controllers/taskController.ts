import express, { Request, Response } from "express";
import Task from "../models/taskModel";
import User from "../models/userModel";
import Skill from "../models/skillModel";
import crypto from "crypto";

// Middleware functions
export const getTaskInfo = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (task) {
            res.send(task);
        } else {
            res.status(404).send("No such document!");
        }
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}

export const getTaskByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const tasks = await Task.find({ user: userId });
        if (tasks) {
            res.send(tasks);
        } else {
            res.status(404).send("No such document!");
        }
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}

export const getTaskBySkill = async (req: Request, res: Response) => {
    try {
        const skillId = req.params.id;
        const tasks = await Task.find({ skill: skillId });
        if (tasks) {
            res.send(tasks);
        } else {
            res.status(404).send("No such document!");
        }
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (!data.title || !data.description || !data.status || !data.user || !data.skill) {
            res.status(400).send("Please provide all required fields");
            return;
        }if (data.status !== "pending" && data.status !== "completed") {
            res.status(400).send("Invalid status");
            return;
        }
        const user = await User.findById(data.user);
        
         if (!user) {
            res.status(400).send("Invalid user");
            return;
        }
        const skill = await Skill
        .findById(data.skill);
         if (!skill) {
            res.status(400).send("Invalid skill");
            return;
        }
        data._id = crypto.randomBytes(10).toString("hex");
        const task = new Task(data);
        await task.save();
        res.send("Task created successfully");
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const data = req.body;
        console.log(data);
        
        const task = await Task.findByIdAndUpdate(taskId, data, { new: true });
        if (task) {
            res.send("Task updated successfully");
        } else {
            res.status(404).send("Task not found");
        }
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const result = await Task.findByIdAndDelete(taskId);
        if (result) {
            res.send("Task deleted successfully");
        }
        else {
            res.status(404).send("Task not found");
        }
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}