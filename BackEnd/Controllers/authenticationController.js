
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from "jsonwebtoken"; 
import { User } from '../Models/userAuthentication.js';
import { generatTokenAndSetCookies } from '../Utils/generatTokenAndSetCookies.js';
import {sendVerificationEmail , sendWelcomeEmail , sendPasswordResetEmail, sendResetSuccessEmail} from '../Mailtrap/emails.js';


export const signup = async (req, res) => {
	const { name , email, password , confirmPassword , role} = req.body;

	try {
		if (!email || !password || !name || !confirmPassword) {
			throw new Error("All fields are required");
		}

		const userAlreadyExists = await User.findOne({ email });
    if(userAlreadyExists === null) {
      console.log("User created successfully")
    } 
		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		if (password!== confirmPassword) {
            throw new Error("Passwords do not match");
        }
		const hashedPassword = await bcrypt.hash(password, 10);
		const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const user = new User({
			name,
			email,
			password: hashedPassword,
			confirmPassword: hashedConfirmPassword,
			role,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});

		await user.save();
		generatTokenAndSetCookies(res, user._id ,user.role);
 await sendVerificationEmail(user.email, verificationToken);
		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
				confirmPassword: undefined
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};
export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },

		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		await sendWelcomeEmail(user.email, user.name);

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
				confirmPassword: undefined
			},
		});
	} catch (error) {
		console.log("error in verify Email ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};
export const login = async (req, res) => {
	const {email, password} = req.body;
 try {
	
	const user = await User.findOne({email});
	if(!user) {
	 return res.status(404).json({ success: false, message: " Email not found" });
	}
	const isPassword = await bcrypt.compare(password, user.password);
	if(!isPassword) {
     return res.status(400).json({ success: false, message: "Incorrect password" });
    }
	const token = jwt.sign({id: user._id ,role: user._role}, process.env.JWT_SECRET, { expiresIn: '7d' });
	user.lastLogin = new Date();
	await user.save();
	res.status(200).json({token});
 } catch (error) {
	
	 res.status(500).json({ success: false, message: "Server error" });
	 console.log("error in login ", error);

 }
   
};
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ 
	success: true, 
	message: "User logged out",});
};

export const forgotPassword = async (req, res) => {
const {email} = req.body;
try {
	const user = await User.findOne({email: email});
	if(!user) {
    return res.status(404).json({ success: false, message: "Email not found" });
    }
	const resetToken =  crypto.randomBytes(10).toString("hex");
	const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
	user.resetPasswordToken = resetToken;
	user.resetPasswordExpiresAt = resetTokenExpiresAt;
	await user.save();
	await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
	res.status(200).json({ success: true, message: "Reset password link sent to your email" });
} catch (error) {
	res.status(500).json({ success: false, message: "Server error" });
	console.log("error in forgotPassword ", error);
}
};


 
export const resetPassword = async (req, res) => {
	const {token} = req.params;
	const {password} = req.body;
    try {
    const user = await User.findOne({resetPasswordToken: token, resetPasswordExpiresAt: {$gt: Date.now()}});
    if(!user) {
    return res.status(404).json({ success: false, message: "Invalid or expired reset password token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
	await sendResetSuccessEmail(user.email);

    res.status(200).json({ success: true, message: "Password reset successfully" });
}catch (error){

	res.status(500).json({ success: false, message: "Server error" });
	console.log("error in resetPassword ", error);
}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
		res.status(200).json({ success: true,
			user:{
				...user._doc,
                password: undefined,
				confirmPassword: undefined
			} 
		});
	} catch (error)	{
		res.status(500).json({ success: false, message: "Server error" });
        console.log("error in checkAuth ", error);
	}
};
 