const jwt = require('jsonwebtoken');
const  PRIVATE_KEY = process.env.PRIVATE_KEY;
const helper = require('../utils/helper.functions');

const verifyJwt=async(req,res,next)=>{
    console.log("const token =")
    const token = req.headers.authorization;
    console.log("token middleware",token);
    if(!token){
        return res.status(401).json({ status: "authorizationError", message: "No token provided",data:'' })
    }
    jwt.verify(token,PRIVATE_KEY,async (err, decoded) => {
        if (err) {
            console.log("middleware",err.message);
           // await verifyRefreshToken(req,res,next);
          return res.status(400).json({ status: "authorizationError", message: "Token expired",data:'' });
        }
        req.user = decoded;
        next();
      });
    
}

const verifyRefreshToken = async(req,res,next)=>{
    const refreshToken = req.cookies['refreshToken'];
  if (!refreshToken) {
    return res.status(401).json({ status: "authorizationError", message: "No refresh token provided",data:'' });
  }

  try {
    const decoded = jwt.verify(refreshToken, PRIVATE_KEY);
    const accessToken = await helper.tokenGenerator(decoded.userData);

    res.setHeader('Authorization', `Bearer ${accessToken}`)
      next()
  } catch (error) {
    return res.status(400).json({ status: "authorizationError", message: "Invalid refresh token",data:'' });
  }
}

module.exports = {
    verifyJwt
}