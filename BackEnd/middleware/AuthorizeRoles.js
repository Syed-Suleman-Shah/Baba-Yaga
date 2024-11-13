export const AuthorizeRoles = (...allowedRoles) =>{
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            console.log("Unauthorized access attempt by user ", req.user.email);
            return res.status(403).json({success: false, message: "Forbidden, unauthorized access."});
        }
        next();
    }
    
}