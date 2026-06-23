import jwt from "jsonwebtoken";

const secretpass = process.env.secretpass;

if (!secretpass) {
    throw new Error("Missing secretpass environment variable");
}

const AuthMiddlware= (req:any,res:any,next:any):void => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            msg:"Bad Auth Header"
        })
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token,secretpass) as any;

        if(decoded.id){
            req.id = decoded.id;
            next()
        }
        else{
           res.status(403).json({
            msg: "Invalid token"
        }) 
        }
    } catch (error) {
        res.status(403).json({
            msg: "Invalid token"
        })
    }
}

module.exports = {
    AuthMiddlware
}