
// const jwt = require("jsonwebtoken");
// const User = require("../models/User"); // Ensure you have this model
// const crypto = require("crypto");

import express from 'express';
import { createUser, deleteUser, updateUser, getUserInfo, getAllUsers } from '../controllers/userController';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/userModel';

const router = express.Router();

router.post("/user", createUser);
router.get("/users", getAllUsers);
router.get("/user/:id", getUserInfo);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// Admin login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  
  try {
    // Find the user by their email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1y"}
    );

    // Set the token as a cookie in the response with a 1-year expiration
    res.cookie("login_token", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    });

    res.status(200).json({
      message: "Sign in successful",
      token,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    });
  } catch (error:any) {
    res.status(400).send(error.message);
  }
});

// Admin signup route
router.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const userId = crypto.randomBytes(10).toString("hex");
      data.id = userId;
      const user = new User(data);
      await user.save();
      res.status(200).json({ message: "User created successfully", data });
    }
  } catch (error:any) {
    res.status(400).send(error.message);
  }
});


export default router;