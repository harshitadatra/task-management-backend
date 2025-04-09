const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 15;
const  User  = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET;

const signupHandler = async (req, res) => {
    console.log("inside signupHandler")
    try {
        const data = req.body;
        console.log("data",req.body)
        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            return res.status(211).json({ message: "User already exists" });
        }
        let encyptedPassword;
        try {
            encyptedPassword = await bcrypt.hash(data.password, saltRounds);
            console.log("ecncrypted pass",encyptedPassword)
        }
        catch (e) {
            return res.status(500).json({ message: "Signup failed.Please try again later" })
        }
        const createdUser = new User({
            ...data,
            password: encyptedPassword
        })
        console.log("created user",createdUser)
        try {
            await createdUser.save()
        }
        catch (e) {
            return res.status(500).json({
                message: "Sign up failed.Please try agaian later!"
            })
        }
        const token = jwt.sign({ userId: createdUser._id, emial: createdUser.email }, JWT_SECRET, { expiresIn: "24h" });
        res.status(201).json({
            message: "Sign up succesfuls",
            user: {
                token,
                id: createdUser._id,
                emial: createdUser.email
            }
        })
    }
    catch (e) {
        return res.status(500).json({
            message: "Sign up failed.Please try agian later"
        })
    }
}

const loginHandler = async (req, res) => {
    const data = req.body;
    let userExist;
    try {
        userExist = await User.findOne({ email: data.email });
    }
    catch (e) {
        return res.status(500).json({ message: "Login failed.Please try again later" })
    }
    if (!userExist) {
        return res.status(401).json({
            message: "Invalid credential.Check your username and password"
        })
    }

    let isPasswordValid = false;
    try {
        isPasswordValid = await bcrypt.compare(data.password, userExist.password)
    }
    catch (e) {
        return res.status(500).json({
            message: "Login failed.Please try again later!"
        })
    }
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid credentials.Cheack your username and password"
        })
    }
    const token = jwt.sign(
        { userId: userExist._id, email: userExist.email },
        JWT_SECRET,
        { expiresIn: "24h" }
    );

    return res.status(200).json({
        message: "Login successful;",
        user: {
            token,
            id: userExist._id,
            email: userExist.email,
        },
    });
}

module.exports = { signupHandler, loginHandler }


