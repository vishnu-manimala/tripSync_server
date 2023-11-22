const jwt = require('jsonwebtoken');
const  PRIVATE_KEY = process.env.PRIVATE_KEY;

const verifyJwt=(req,res,next)=>{
  
    const token = req.headers.authorization;
    console.log("token middleware",token);
    if(!token){
        return res.status(401).json({ message: 'Token is missing' })
    }
    jwt.verify(token,PRIVATE_KEY,(err, decoded) => {
        if (err) {
            console.log(err.message);
          return res.status(401).json({ message: 'Token is invalid' });
        }
        req.user = decoded;
         // Store the decoded user information in the request object
        next();
      });
    
}

module.exports = {
    verifyJwt
}