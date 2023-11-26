const isBlocked = (req,res,next)=>{
    if(req.user.userData.isBlocked){
        return res.status(401).json({ status: "authorizationError", message: "Token expired",data:'' })
    }
    next();
}

module.exports = {
    isBlocked
}