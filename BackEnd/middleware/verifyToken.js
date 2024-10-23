import jwt from 'jsonwebtoken';

import { User } from '../Models/userAuthentication.js';

 
export const verifyToken = (req , res , next) => {
    const token = req.cookies.token;
    if (!token)
    {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if(!decoded){
        return res.status(400).json({ success: false, message: 'Token is not valid' });
       }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error ' });
        console.log("error in verifyToken ", error);
    }
};


export const verifyTokenForRole = async (req, res, next) => {
    let token; // token
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         if (!decoded) {
            return res.status(400).json({ success: false, message: 'Token is not valid' });
        }
        const user = await User.findById(decoded.id); 
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        req.user = {
            id: user._id,
            email: user.email,
            role: user.role 
        };
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
        console.log("error in verifyTokenForRole ", error);
    }
};
