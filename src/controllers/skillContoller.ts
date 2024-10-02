import express, { Request, Response } from "express";
import Skill from "../models/skillModel";
import crypto from "crypto";

// Middleware functions
export const getSkillInfo = async (req: Request, res: Response,) => {
    try {
        const skillId = req.params.id;
        const skill = await Skill
            .findById(skillId);
        if (skill) {
            res.send(skill);
        }
        else {
            res.status(404).send("No such skill!");
        }
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}

export const getAllSkills = async (req: Request, res: Response,) => {
    try {
        const skills = await Skill
            .find();
        res.send(skills);
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}

export const createSkill = async (req: Request, res: Response,) => {
    try {
        const data = req.body;
        if (!data.title || !data.description) {
            res
                .status(400)
                .send("Please provide all required fields");
            return;
        }
        data._id = crypto
            .randomBytes(10)
            .toString("hex");
        const skill = new Skill(data);
        await skill.save();
        res.send("Skill created successfully");
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}

export const updateSkill = async (req: Request, res: Response,) => {
    try {
        const skillId = req.params.id;
        const data = req.body;
        const skill = await Skill
            .findByIdAndUpdate(skillId, data, { new: true });
        if (skill) {
            res.send("Skill updated successfully");
        }
        else {
            res.status(404).send("Skill not found");
        }
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}

export const deleteSkill = async (req: Request, res: Response,) => {
    try {
        const skillId = req.params.id;
        const result = await Skill
            .findByIdAndDelete(skillId);
        if (result) {
            res.send("Skill deleted successfully");
        }
        else {
            res.status(404).send("Skill not found");
        }
    }
    catch (error: any) {
        res
            .status(400)
            .send(error.message);
    }
}


