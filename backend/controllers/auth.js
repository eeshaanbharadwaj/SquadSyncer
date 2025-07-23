import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// REGISTER USER
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            skills,
            email,
            contactNumber,
            password
        } = req.body
        if (!firstName || !lastName || !skills || !email || !contactNumber || !password) {
            return res.status(400).json({
                error: "Missing Data in the registeration form."
            })
        }
        // https://regexr.com/3e48o
        if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            return res.status(400).json({
                error: "Invalid Email Format"
            })
        }
        // self made regex :: BEWARE ::
        if (!contactNumber || !contactNumber.match(/^\d{10}$/g)) {
            return res.status(400).json({
                error: "Invalid Indian Contact Number Format (Try Something like 12345678890)"
            })
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            contactNumber,
            skills,
            email,
            password: passwordHash,
            teams: [],
            pendingRequest: [],
            acceptedRequest: [],
        });
        const savedUser = await newUser.save();
        const { _id } = savedUser;
        const curUser = { _id, firstName, lastName, contactNumber, email };
        const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });
        res.status(201).json({ token, curUser });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//LOGIN

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "You're missing either email or password!"
            })
        }
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ message: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials." })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });
        const { _id, firstName, lastName, contactNumber } = user;
        const curUser = { _id, firstName, lastName, contactNumber, email }
        res.status(200).json({ token, curUser });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get user 

export const getUser = async (req, res) => {
    try {
        const user_ID = req.user;
        const user = await User.findById(user_ID);
        const { _id, firstName, lastName, contactNumber, email } = user;
        const curUser = { _id, firstName, lastName, contactNumber, email }
        res.status(200).json(curUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Edit Profile page

export const edit = async (req, res) => {
    try {
        const newUser = await User.findById(req.user);
        const { firstName, lastName, email, contactNumber, skills } = newUser;
        const response = { firstName, lastName, email, contactNumber, skills }
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Edit Profile

export const editProfile = async (req, res) => {
    try {
        const regUser = await User.findById(req.user);
        const newUser = req.body;
        const user = await User.findByIdAndUpdate(regUser._id, newUser, { new: true });
        await user.save();
        const { _id, firstName, lastName, contactNumber, email } = user;
        const curUser = { _id, firstName, lastName, contactNumber, email }
        res.status(200).json(curUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
