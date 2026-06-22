import jwt from "jsonwebtoken";
const secretpass = process.env.secretpass;

const AuthMiddlware= (req:Request,res:Response,next:any):void => {
    const authHeader = req.headers.authorization;

    if(!authHeader || authHeader.startsWith("Bearer")){
        return res.status(401).json({
            msg:"Bad Auth Header"
        })
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token,secretpass)

        if(decoded.email_id){
            req.email_id = decoded.email_id
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