import express, { Request, Response } from "express";
import User from "../models/userModel";
import crypto from "crypto";

// Middleware functions
export const getUserInfo = async (req: Request, res: Response,) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("No such document!");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

export const getAllUsers = async (req: Request, res: Response,) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

export const createUser = async (req: Request, res: Response,) => {
    try {
        const data = req.body;
        data._id = crypto.randomBytes(10).toString("hex");
        const user = new User(data);
        await user.save();
        res.send("User created successfully");
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

export const updateUser = async (req: Request, res: Response,) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        const user = await User.findByIdAndUpdate(userId, data, { new: true });
        if (user) {
            res.send("User updated successfully");
        } else {
            res.status(404).send("User not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

export const deleteUser = async (req: Request, res: Response,) => {
    try {
        const userId = req.params.id;
        const result = await User.findByIdAndDelete(userId);
        if (result) {
            res.send("User deleted successfully");
        } else {
            res.status(404).send("User not found");
        }
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};