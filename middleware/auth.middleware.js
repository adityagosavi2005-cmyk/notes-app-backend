const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch{
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}

module.exports = authMiddleware;