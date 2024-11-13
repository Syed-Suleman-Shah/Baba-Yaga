import jwt from 'jsonwebtoken';
import { User } from '../Models/userAuthentication.js';

export const verifyTokenForRole = async (req, res, next) => {
    let token; 
    let authHeader = req.headers['authorization'] || req.headers['Authorization'];

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

        const user = await User.findById(decoded.userId); // Using decoded.userId
     
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
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ success: false, message: 'Token has expired. Please log in again.' });
        }
        console.error("Error in verifyTokenForRole:", error); // Corrected logging
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
