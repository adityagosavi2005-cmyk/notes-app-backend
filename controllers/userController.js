const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) =>{

    try{

        const existingUser = await User.findOne({
            email: req.body.email
        });

        if(existingUser){
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const user = new User(req.body);

        const savedUser = await user.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        });

    } catch(error){
        res.status(400).json({
            message: error.message
        });
    }

};


const loginUser = async (req, res) =>{
    try{

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({
            email: email

        });

        if(!user){
            return res.status(404).json({
                message:"User does not exist, Register first"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign({
            userId: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
        );

        res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        return res.status(200).json({
            success: true,
            message: "Login Successful",
        })

        

    } catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const logoutUser = (req, res) =>{
    res.clearCookie("token",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    });

    return res.status(200).json({
        success: true,
        message: "Logout successful"
    });
};

const getProfile = async (req, res) => {
    try {

        return res.status(200).json({
            success: true,
            user: {
                name: req.user.name,
                email: req.user.email
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getProfile
};
